--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-11-09 16:33:33 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3620 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 16414)
-- Name: Employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Employee" (
    name character varying(30) DEFAULT 'Gabriel'::character varying NOT NULL,
    email character varying(30) DEFAULT 'gabrieledward00@gmail.com'::character varying NOT NULL,
    employee_id integer NOT NULL,
    password character varying(30) DEFAULT 'password'::character varying NOT NULL
);


ALTER TABLE public."Employee" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16462)
-- Name: a_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.a_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.a_sequence OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16432)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    name character varying(30)[],
    password character varying(30)[],
    email character varying(30)[] NOT NULL
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16439)
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    name character varying(30),
    password character varying(30),
    email character varying(30) NOT NULL,
    accountid integer DEFAULT nextval('public.a_sequence'::regclass) NOT NULL,
    account_role character varying(30),
    account_department character varying(60)
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16445)
-- Name: task_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_list (
    "taskID" integer NOT NULL,
    task_description character varying(125) DEFAULT 'no task description'::character varying,
    department_name character varying(60) DEFAULT 'Basic Onboarding'::character varying NOT NULL,
    deadline date NOT NULL,
    confrim_status boolean DEFAULT false NOT NULL,
    confirm_date date,
    employee_name character varying(60),
    member_assigned character varying(60),
    assigned_employee_id integer
);


ALTER TABLE public.task_list OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16464)
-- Name: t_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t_sequence OWNER TO postgres;

--
-- TOC entry 3621 (class 0 OID 0)
-- Dependencies: 218
-- Name: t_sequence; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.t_sequence OWNED BY public.task_list."taskID";


--
-- TOC entry 213 (class 1259 OID 16429)
-- Name: test_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_table (
    sometext character varying(100)
);


ALTER TABLE public.test_table OWNER TO postgres;

--
-- TOC entry 3459 (class 2604 OID 16465)
-- Name: task_list taskID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_list ALTER COLUMN "taskID" SET DEFAULT nextval('public.t_sequence'::regclass);


--
-- TOC entry 3608 (class 0 OID 16414)
-- Dependencies: 211
-- Data for Name: Employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Employee" (name, email, employee_id, password) FROM stdin;
Gabriel	good@gmail.com	3	password
gabb	bad@gmail.com	34	hello
\.


--
-- TOC entry 3610 (class 0 OID 16432)
-- Dependencies: 214
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (name, password, email) FROM stdin;
\.


--
-- TOC entry 3611 (class 0 OID 16439)
-- Dependencies: 215
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (name, password, email, accountid, account_role, account_department) FROM stdin;
ben	cool	bad@yahoo.com	2	Supervisor	Basic Onboarding
gabe	password	Great@gmail.com	1	Admin	Basic Onboarding
tom	real	tom@gmail.com	3	NewHire	Basic Onboarding
\.


--
-- TOC entry 3612 (class 0 OID 16445)
-- Dependencies: 216
-- Data for Name: task_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task_list ("taskID", task_description, department_name, deadline, confrim_status, confirm_date, employee_name, member_assigned, assigned_employee_id) FROM stdin;
1	t1	b1	2022-10-26	f	\N	\N	m1	2
2	t1	b1	2022-10-26	t	\N	\N	m1	2
\.


--
-- TOC entry 3609 (class 0 OID 16429)
-- Dependencies: 213
-- Data for Name: test_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_table (sometext) FROM stdin;
It worked
\.


--
-- TOC entry 3622 (class 0 OID 0)
-- Dependencies: 217
-- Name: a_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.a_sequence', 3, true);


--
-- TOC entry 3623 (class 0 OID 0)
-- Dependencies: 218
-- Name: t_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t_sequence', 2, true);


--
-- TOC entry 3461 (class 2606 OID 16421)
-- Name: Employee Employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_pkey" PRIMARY KEY (employee_id);


--
-- TOC entry 3465 (class 2606 OID 16461)
-- Name: employee accountID_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "accountID_pkey" PRIMARY KEY (accountid);


--
-- TOC entry 3463 (class 2606 OID 16438)
-- Name: account employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT employee_pkey PRIMARY KEY (email);


--
-- TOC entry 3467 (class 2606 OID 16452)
-- Name: task_list task_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_list
    ADD CONSTRAINT task_list_pkey PRIMARY KEY ("taskID");


--
-- TOC entry 3468 (class 2606 OID 16466)
-- Name: task_list employee_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_list
    ADD CONSTRAINT employee_foreign_key FOREIGN KEY (assigned_employee_id) REFERENCES public.employee(accountid) NOT VALID;


-- Completed on 2022-11-09 16:33:33 CST

--
-- PostgreSQL database dump complete
--

