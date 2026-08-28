BEGIN;

CREATE TABLE IF NOT EXISTS public.roles
(
    id INTEGER NOT NULL,
    role_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (role_name)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES public.roles (id)
);

CREATE TABLE IF NOT EXISTS public.categories
(
    id INTEGER NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY (id),
    UNIQUE (category_name)
);

CREATE TABLE IF NOT EXISTS public.statuses
(
    id INTEGER NOT NULL,
    status_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (status_name)
);

CREATE TABLE IF NOT EXISTS public.priority_level
(
    id INTEGER NOT NULL,
    priority_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (priority_name)
);

CREATE TABLE IF NOT EXISTS public.issues
(
    id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    reported_by INTEGER NOT NULL,
    reported_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(255) NOT NULL,
    priority_level_id INTEGER NOT NULL,
    status_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_issues_category
        FOREIGN KEY (category_id)
        REFERENCES public.categories (id),

    CONSTRAINT fk_issues_reported_by
        FOREIGN KEY (reported_by)
        REFERENCES public.users (id),

    CONSTRAINT fk_issues_priority
        FOREIGN KEY (priority_level_id)
        REFERENCES public.priority_level (id),

    CONSTRAINT fk_issues_status
        FOREIGN KEY (status_id)
        REFERENCES public.statuses (id)
);

CREATE TABLE IF NOT EXISTS public.comments
(
    id INTEGER NOT NULL,
    issue_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),

    CONSTRAINT fk_comments_issue
        FOREIGN KEY (issue_id)
        REFERENCES public.issues (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id)
        REFERENCES public.users (id)
);

COMMIT;