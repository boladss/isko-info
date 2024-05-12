class Appeal < ApplicationRecord
  belongs_to :user
  belongs_to :course_policy 
end
  