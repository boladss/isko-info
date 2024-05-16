# Destroy all existing data first
ActionText::RichText.delete_all
Appeal.delete_all
CoursePolicy.delete_all
User.delete_all
Department.delete_all
UniversityCollege.delete_all

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
Department.create(code: "DFPP", name: "Departamento ng Filipino at Panitikan ng Pilipinas", university_college_id: 2)

# Create dummy data for CoursePolicies
CoursePolicy.create(course_title: "CS 11", course_description: "Computer Programming I", code: "DCS", department_id: 1, remaining_slots: 25, total_slots: 100, prerogative_policy: "Test prerog policy", waitlisting_schedule: "Test waitlisting schedule", cancellation_procedure: "Test cancellation procedure", other_information: "Test other info")
CoursePolicy.create(course_title: "CS 12", course_description: "Computer Programming II", code: "DCS", department_id: 1, remaining_slots: 0, total_slots: 50, prerogative_policy: "Test prerog policy", waitlisting_schedule: "Test waitlisting schedule", cancellation_procedure: "Test cancellation procedure", other_information: "Test other info")
CoursePolicy.create(course_title: "CS 145", course_description: "Computer Networks", code: "DCS", department_id: 1, remaining_slots: 10, total_slots: 100, prerogative_policy: "Test prerog policy", waitlisting_schedule: "Test waitlisting schedule", cancellation_procedure: "Test cancellation procedure", other_information: "Test other info")
CoursePolicy.create(course_title: "CS 192", course_description: "Software Engineering II", code: "DCS", department_id: 1, remaining_slots: 0, total_slots: 50, prerogative_policy: "Test prerog policy", waitlisting_schedule: "Test waitlisting schedule", cancellation_procedure: "Test cancellation procedure", other_information: "Test other info")
CoursePolicy.create(course_title: "Art Stud 1", course_description: "The Field of Art Studies", code: "DAS", department_id: 2, remaining_slots: 0, total_slots: 50, prerogative_policy: "Test prerog policy", waitlisting_schedule: "Test waitlisting schedule", cancellation_procedure: "Test cancellation procedure", other_information: "Test other info")
CoursePolicy.create(course_title: "FIL 40", course_description: "Wika, Kultura, at Lipunan", code: "DFPP", department_id: 3, remaining_slots: 0, total_slots: 200, prerogative_policy: "Test prerog policy", waitlisting_schedule: "Test waitlisting schedule", cancellation_procedure: "Test cancellation procedure", other_information: "Test other info")

# Users stored in Firebase
User.create(username: "satosugu",  user_type: "student",  course_code: "0",  firebase_id: "GS24bbV63pSNHb4kQM9r8tS6ojC2")
User.create(username: "antonnnn",  user_type: "student",  course_code: "0",  firebase_id: "6uNmByEnUoQoDCk2EB5kn5IsQzG2")
User.create(username: "gljuganas",  user_type: "student",  course_code: "0",  firebase_id: "8KRAVfBS6lSPai1Jh8sgPf4miRG2")
User.create(username: "JamesDcy",  user_type: "student",  course_code: "0",  firebase_id: "CGrWakH6EGNooxdnTB4uAqzMzTy2")
User.create(username: "nonrepudiation",  user_type: "student",  course_code: "0",  firebase_id: "HBBUATakLEYcJvLjYK7RTDYsvpe2")
User.create(username: "usertest",  user_type: "student",  course_code: "0",  firebase_id: "I9bHKQqofIU4fYCBAtySl6w1g4u1")