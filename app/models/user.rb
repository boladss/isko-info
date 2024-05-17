class User < ApplicationRecord
    has_many :appeals
    has_many :course_policies, through: :appeals
end
