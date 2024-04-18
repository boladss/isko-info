class CoursePolicy < ApplicationRecord
    has_rich_text :prerogative_policy
    has_rich_text :waitlisting_schedule
    has_rich_text :cancellation_procedure
    has_rich_text :other_information
    validates :course_title, presence: true
    validates :course_description, presence: true
    validates :prerogative_policy, presence: true
    validates :waitlisting_schedule, presence: true
    validates :cancellation_procedure, presence: true
    validates :other_information, presence: true
    
end
