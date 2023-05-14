INSERT INTO users (
    user_id,
    first_name,
    last_name,
    email,
    password,
    phone_number,
    profile_picture,
    is_host,
    created_at,
    updated_at,
    reviews
  )
VALUES (
    user_id :int,
    'first_name:varchar',
    'last_name:varchar',
    'email:varchar',
    'password:varchar',
    'phone_number:varchar',
    'profile_picture:varchar',
    'is_host:tinyint',
    'created_at:timestamp',
    'updated_at:timestamp',
    'reviews:bigint'
  );