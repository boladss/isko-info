# Destroy all existing data first
ActionText::RichText.delete_all
Appeals.delete_all
CoursePolicy.delete_all
User.delete_all
Department.delete_all
UniversityCollege.delete_all


User.delete_all

ActiveRecord::Base.connection.execute("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'university_colleges'")
ActiveRecord::Base.connection.execute("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'departments'")
ActiveRecord::Base.connection.execute("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'course_policies'")
ActiveRecord::Base.connection.execute("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'users'")

# Create dummy data for UniversityColleges
UniversityCollege.create(name: "College of Engineering")
UniversityCollege.create(name: "College of Arts and Letters")

# Create dummy data for Departments
Department.create(code: "DCS", name: "Department of Computer Science", university_college_id: 1)
Department.create(code: "DAS", name: "Department of Art Studies", university_college_id: 2)

# Create dummy data for CoursePolicies
CoursePolicy.create(course_title: "14124", course_description: "41", code: "DCS", department_id: 1, appeal_count: 200, prerogative_policy: "lorem ipsum", waitlisting_schedule: "lorem ipsum", cancellation_procedure: "lorem ipsum", other_information: "lorem ipsum")
CoursePolicy.create(course_title: "Arts 1", course_description: "doggy ge", code: "DAS", department_id: 2, appeal_count: 200, prerogative_policy: "lorem ipsum", waitlisting_schedule: "lorem ipsum", cancellation_procedure: "lorem ipsum", other_information: "lorem ipsum")

User.create(username: "satosugu",  user_type: "student",  course_code: "0",  firebase_id: "GS24bbV63pSNHb4kQM9r8tS6ojC2")