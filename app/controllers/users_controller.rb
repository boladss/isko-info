class User < ApplicationRecord
    validates :username, presence: true
    validates :type, presence: true
    validates :course_code, presence: true
end