INSERT INTO department  (name)
values  ('marketing'),
        ('sales'),
        ('finance'),
        ('human resources'),
        ('customer service'),
        ('IT/technology');


INSERT INTO role (title, salary, department_id)
values  ('Creative Director', 65000, 1),
        ('Regional Manager', 80000, 2),
        ('Customer service rep', 40000, 5),
        ('Front End Developer', 70000, 6),
        ('Back end Developer', 75000, 6),
        ('Social Media Specialist', 50000, 1),
        ('HR rep', 57000, 4),
        ('Accountant', 55000, 3),
        ('Actuary', 75000, 3),
        ('Head of HR', 65000, 4),
        ('Customer Service Manager', 53000, 5),
        ('Sale Rep', 45000, 2);




INSERT INTO employee (first_name, last_name, role_id, manager_id)
values  ('Don', 'Draper', 1,  NULL),
        ('Roger', 'Sterling', 2, NULL),
        ('Barney', 'Stinson', 3, 2),
        ('Marshall', 'Ericson', 4, 1), 
        ('Ted', 'Mosby', 5, 2),
        ('Lilly', 'Aldrin', 6, 1),
        ('Robin', 'Scherbatsky', 7, 2),
        ('Tommy', 'Shelby', 8, 2),
        ('Peggy', 'Olson', 9, 2),
        ('Elliot', 'Alderson', 10, 2),
        ('Pete', 'Campbell', 11, 2)
        ('Joan', 'Harris', 12, 2);
