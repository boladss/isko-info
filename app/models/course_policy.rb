class CoursePolicy < ApplicationRecord
    has_rich_text :prerogative_policy
    has_rich_text :waitlisting_schedule
    has_rich_text :cancellation_procedure
    has_rich_text :other_information
end
