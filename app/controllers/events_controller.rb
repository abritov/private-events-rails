class EventsController < ApplicationController
  before_action :set_event, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except: [:index, :show]

  # GET /events
  def index
    @events = Event.all
  end

  # GET /events/1
  def show
  end

  # GET /events/new
  def new
    @event = current_user.created_events.build
    @event.date ||= DateTime.now + 1.day
  end

  # GET /events/1/edit
  def edit
    # TODO owner check
  end

  # POST /events
  def create
    @event = current_user.created_events.build(event_params)

    if @event.save
      redirect_to @event, notice: "Event was successfully created."
    else
      render :new, status: :unprocessable_content
    end
  end

  # PATCH/PUT /events/1
  def update
    # TODO owner check
    if @event.update(event_params)
      redirect_to @event, notice: "Event was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_content
    end
  end

  # DELETE /events/1
  def destroy
    # TODO owner check
    @event.destroy!
    redirect_to events_path, notice: "Event was successfully destroyed.", status: :see_other
  end

  def attend
    @event = Event.find(params[:id])
    attendance = @event.attendances.build(user: current_user)

    if attendance.save
      redirect_to @event, notice: 'You are now attending this event!'
    else
      redirect_to @event, alert: 'Could not attend event.'
    end
  end

  def unattend
    @event = Event.find(params[:id])
    attendance = @event.attendances.find_by(user: current_user)

    if attendance&.destroy
      redirect_to @event, notice: 'You are no longer attending this event.'
    else
      redirect_to @event, alert: 'Could not remove attendance.'
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def event_params
      # TODO update, expect probably deprecated
      params.expect(event: [ :title, :description, :date, :location, :user_id ])
    end
end
