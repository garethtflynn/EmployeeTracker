INSERT INTO departments  (depName)
values  ('marketing'),
        ('finance'),
        ('sales'),
        ('engineering');


INSERT INTO roles (title, salary, department_id)
values  ('Creative Director', 80000, 1),
        ('Social Media Specialist', 50000, 1),
        ('Senior Developer', 150000, 4),
        ('Junior Developer', 80000, 4),
        ('Sales Manager', 70000, 2),
        ('Sale Rep', 45000, 2),
        ('Account Manager', 65000,3),
        ('Accountant', 55000 ,3);
    
        

INSERT INTO employees (first_name, last_name, role_id, manager_id)
values  ('Don', 'Draper', 1,  NULL),
        ('Peggy', 'Olson', 2, 1),
        ('Elliot', 'Alderson', 3, NULL),
        ('Ted', 'Mosby', 4, 3),
        ('Roger', 'Sterling', 5, NULL),
        ('Tommy', 'Shelby', 6, 5),
        ('Barney', 'Stinson', 7, NULL),
        ('Marshall', 'Ericson', 8, 7); 
