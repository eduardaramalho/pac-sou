CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    birth_date DATE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into users (username, birth_date, email, password, role) values
('Anna Cristina Koerich', '2004-08-12', 'anna.koerich@catolicasc.edu.br', '$2a$10$e7IvPyrurG1O49WUlsP8aursM56sXvdi95AJQtCKn7jPS99H3tOai', 'professor'),
('Eduarda Cristina Nunes Da Silveira Ramalho', '2005-05-31', 'eduarda.ramalho@catolicasc.edu.br', '$2a$10$XpUU0vcja6paC8u3PkG/O.tQwr6ZP2sv2sAh0.sCpZqAcxSyvAvMW', 'professor'),
('Eduardo Alberto Dal''Piaz', '2005-01-15', 'eduardo.piaz@catolicasc.edu.br', '$2a$10$ti1qwna2MRGJl/ulo/fuVOBBM9WonMBgMSGsbVt7gvu9tXrzzeq4O', 'aluno');



