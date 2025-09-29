class Event < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :date, presence: true
  validates :location, presence: true

  # Attendees through attendances
  has_many :attendances
  has_many :attendees, through: :attendances, source: :user

  scope :past, -> { where('date < ?', DateTime.now) }
  scope :upcoming, -> { where('date > ?', DateTime.now) }
  default_scope -> { order(date: :asc) }
end
