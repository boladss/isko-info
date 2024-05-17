class Department < ApplicationRecord
  has_rich_text :department_policy
  has_many :course_policies
  belongs_to :university_college
end
