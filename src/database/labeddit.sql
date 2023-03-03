-- Active: 1677870589613@@127.0.0.1@3306
CREATE TABLE users(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT DEFAULT(DATETIME())
);

INSERT INTO users (id, name, email, password, role) VALUES
  ("u001", "Paula", "paula@gmail.com", "$2a$12$CIHI6habJCFvlzVeoKpZq.k2DVqfaBYVewqlDgHcLPUROCkaRkPcq", "admin"),
  ("u002", "Bárbara", "barbara@gmail.com", "$2a$12$b9DI5pp1GFlF48IqGJylu.NtQjftS0oqEId5n.xGxh/wCSsBTlVmS", "author"),
  ("u003", "Aline", "aline@gmail.com", "$2a$12$.R4cGV1ZAEH8DcR2/3brA.N2rJ4QRNyRQYqe3IKP.fgZpsD9lp4v2", "author"),
  ("u004", "Lana", "lana@gmail.com", "$2a$12$DWV0r/1LTaCn3EiOfcRq2O.BQAHTkdusEKmTk9qO5/oudsmWDNzTe", "author");

CREATE TABLE posts (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT(0),
  dislikes INTEGER DEFAULT(0),
  created_at TEXT DEFAULT(DATETIME()),
  updated_at TEXT DEFAULT(DATETIME()),
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO posts (id, creator_id, content) VALUES
  ("p001", "u002", "Oie!"),
  ("p002", "u003", "Bom dia!"),
  ("p003", "u004", "Au auuu!!!");

CREATE TABLE comments (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT(0),
  dislikes INTEGER DEFAULT(0),
  created_at TEXT DEFAULT(DATETIME()),
  updated_at TEXT DEFAULT(DATETIME()),
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO comments (id, creator_id, post_id, content) VALUES
  ("c001", "u001", "p001", "Tudo bem?"),
  ("c002", "u002", "p001", "Tudo ótimo!"),
  ("c003", "u001", "p001", "Que bom!"),
  ("c004", "u002", "p002", "Bom dia!"),
  ("c005", "u003", "p002", "Bom dia pra você!"),
  ("c006", "u004", "p002", "Auuuu!!!"),
  ("c007", "u002", "p003", "Sua linda!!!"),
  ("c008", "u001", "p003", "Minha nenê!!!"),
  ("c009", "u004", "p003", "Auuuuu auuu!!!");

CREATE TABLE likes_dislikes_posts (
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  UNIQUE (user_id, post_id)
);

CREATE TABLE likes_dislikes_comments (
  user_id TEXT NOT NULL,
  comment_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  UNIQUE (user_id, comment_id, post_id)
);

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM comments;