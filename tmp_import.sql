SET session_replication_role = 'replica';
COPY public.verifications (id, "userId", "verifierUserId", "createdAt", "updatedAt") FROM stdin;
\.
