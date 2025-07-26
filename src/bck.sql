--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-07-24 15:23:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 16557)
-- Name: branches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branches (
    branch_id integer NOT NULL,
    company_id integer NOT NULL,
    branch_name character varying(255) NOT NULL,
    address text,
    phone character varying(20),
    status character varying(10) DEFAULT 'active'::character varying,
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT branches_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


ALTER TABLE public.branches OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16556)
-- Name: branches_branch_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.branches_branch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.branches_branch_id_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 227
-- Name: branches_branch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.branches_branch_id_seq OWNED BY public.branches.branch_id;


--
-- TOC entry 230 (class 1259 OID 16575)
-- Name: branchusers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branchusers (
    branch_user_id integer NOT NULL,
    user_id integer NOT NULL,
    branch_id integer NOT NULL,
    assigned_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(10) DEFAULT 'active'::character varying,
    CONSTRAINT branchusers_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


ALTER TABLE public.branchusers OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16574)
-- Name: branchusers_branch_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.branchusers_branch_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.branchusers_branch_user_id_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 229
-- Name: branchusers_branch_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.branchusers_branch_user_id_seq OWNED BY public.branchusers.branch_user_id;


--
-- TOC entry 232 (class 1259 OID 16595)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    company_id integer NOT NULL,
    category_name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16594)
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_category_id_seq OWNER TO postgres;

--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 231
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- TOC entry 226 (class 1259 OID 16540)
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    company_id integer NOT NULL,
    user_id integer NOT NULL,
    company_name character varying(255) NOT NULL,
    contact_email character varying(255) NOT NULL,
    contact_phone character varying(20),
    address text,
    registration_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(10) DEFAULT 'active'::character varying,
    CONSTRAINT companies_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16539)
-- Name: companies_company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.companies_company_id_seq OWNER TO postgres;

--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 225
-- Name: companies_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_company_id_seq OWNED BY public.companies.company_id;


--
-- TOC entry 236 (class 1259 OID 16631)
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    inventory_id integer NOT NULL,
    company_id integer NOT NULL,
    branch_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16630)
-- Name: inventory_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventory_inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventory_inventory_id_seq OWNER TO postgres;

--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 235
-- Name: inventory_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventory_inventory_id_seq OWNED BY public.inventory.inventory_id;


--
-- TOC entry 244 (class 1259 OID 16708)
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    sale_id integer NOT NULL,
    payment_method character varying(20) NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT payments_payment_method_check CHECK (((payment_method)::text = ANY ((ARRAY['cash'::character varying, 'card'::character varying, 'transfer'::character varying])::text[])))
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16707)
-- Name: payments_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_payment_id_seq OWNER TO postgres;

--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 243
-- Name: payments_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;


--
-- TOC entry 222 (class 1259 OID 16506)
-- Name: plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans (
    plan_id integer NOT NULL,
    plan_name character varying(100) NOT NULL,
    price_monthly numeric(10,2) NOT NULL,
    price_yearly numeric(10,2),
    max_users integer,
    max_branches integer,
    features text,
    status character varying(10) DEFAULT 'active'::character varying,
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT plans_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


ALTER TABLE public.plans OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16505)
-- Name: plans_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plans_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plans_plan_id_seq OWNER TO postgres;

--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 221
-- Name: plans_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plans_plan_id_seq OWNED BY public.plans.plan_id;


--
-- TOC entry 234 (class 1259 OID 16609)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    company_id integer NOT NULL,
    category_id integer NOT NULL,
    product_code character varying(50) NOT NULL,
    product_name character varying(255) NOT NULL,
    description text,
    cost_price numeric(10,2) NOT NULL,
    sale_price numeric(10,2) NOT NULL,
    status character varying(10) DEFAULT 'active'::character varying,
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT products_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16608)
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_product_id_seq OWNER TO postgres;

--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 233
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- TOC entry 218 (class 1259 OID 16476)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL,
    description text
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16475)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 217
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 240 (class 1259 OID 16677)
-- Name: saledetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saledetails (
    detail_id integer NOT NULL,
    sale_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    subtotal numeric(10,2) NOT NULL
);


ALTER TABLE public.saledetails OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16676)
-- Name: saledetails_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saledetails_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saledetails_detail_id_seq OWNER TO postgres;

--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 239
-- Name: saledetails_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saledetails_detail_id_seq OWNED BY public.saledetails.detail_id;


--
-- TOC entry 238 (class 1259 OID 16654)
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    sale_id integer NOT NULL,
    company_id integer NOT NULL,
    branch_id integer NOT NULL,
    user_id integer NOT NULL,
    sale_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total numeric(10,2) NOT NULL
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16653)
-- Name: sales_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sales_sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_sale_id_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 237
-- Name: sales_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_sale_id_seq OWNED BY public.sales.sale_id;


--
-- TOC entry 224 (class 1259 OID 16520)
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    subscription_id integer NOT NULL,
    user_id integer NOT NULL,
    plan_id integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying,
    payment_method character varying(20),
    CONSTRAINT subscriptions_payment_method_check CHECK (((payment_method)::text = ANY ((ARRAY['cash'::character varying, 'card'::character varying, 'transfer'::character varying])::text[]))),
    CONSTRAINT subscriptions_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'expired'::character varying, 'cancelled'::character varying])::text[])))
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16519)
-- Name: subscriptions_subscription_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subscriptions_subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subscriptions_subscription_id_seq OWNER TO postgres;

--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 223
-- Name: subscriptions_subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subscriptions_subscription_id_seq OWNED BY public.subscriptions.subscription_id;


--
-- TOC entry 242 (class 1259 OID 16694)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    supplier_id integer NOT NULL,
    company_id integer NOT NULL,
    supplier_name character varying(255) NOT NULL,
    phone character varying(20),
    email character varying(255),
    address text
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16693)
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suppliers_supplier_id_seq OWNER TO postgres;

--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 241
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_supplier_id_seq OWNED BY public.suppliers.supplier_id;


--
-- TOC entry 220 (class 1259 OID 16487)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role_id integer NOT NULL,
    status character varying(10) DEFAULT 'active'::character varying,
    creation_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16486)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4819 (class 2604 OID 16560)
-- Name: branches branch_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches ALTER COLUMN branch_id SET DEFAULT nextval('public.branches_branch_id_seq'::regclass);


--
-- TOC entry 4822 (class 2604 OID 16578)
-- Name: branchusers branch_user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchusers ALTER COLUMN branch_user_id SET DEFAULT nextval('public.branchusers_branch_user_id_seq'::regclass);


--
-- TOC entry 4825 (class 2604 OID 16598)
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- TOC entry 4816 (class 2604 OID 16543)
-- Name: companies company_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN company_id SET DEFAULT nextval('public.companies_company_id_seq'::regclass);


--
-- TOC entry 4829 (class 2604 OID 16634)
-- Name: inventory inventory_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory ALTER COLUMN inventory_id SET DEFAULT nextval('public.inventory_inventory_id_seq'::regclass);


--
-- TOC entry 4835 (class 2604 OID 16711)
-- Name: payments payment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);


--
-- TOC entry 4811 (class 2604 OID 16509)
-- Name: plans plan_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans ALTER COLUMN plan_id SET DEFAULT nextval('public.plans_plan_id_seq'::regclass);


--
-- TOC entry 4826 (class 2604 OID 16612)
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- TOC entry 4807 (class 2604 OID 16479)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 4833 (class 2604 OID 16680)
-- Name: saledetails detail_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saledetails ALTER COLUMN detail_id SET DEFAULT nextval('public.saledetails_detail_id_seq'::regclass);


--
-- TOC entry 4831 (class 2604 OID 16657)
-- Name: sales sale_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales ALTER COLUMN sale_id SET DEFAULT nextval('public.sales_sale_id_seq'::regclass);


--
-- TOC entry 4814 (class 2604 OID 16523)
-- Name: subscriptions subscription_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions ALTER COLUMN subscription_id SET DEFAULT nextval('public.subscriptions_subscription_id_seq'::regclass);


--
-- TOC entry 4834 (class 2604 OID 16697)
-- Name: suppliers supplier_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN supplier_id SET DEFAULT nextval('public.suppliers_supplier_id_seq'::regclass);


--
-- TOC entry 4808 (class 2604 OID 16490)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 5056 (class 0 OID 16557)
-- Dependencies: 228
-- Data for Name: branches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branches (branch_id, company_id, branch_name, address, phone, status, creation_date) FROM stdin;
1	4	SucursalUno	direccion ciudad	12345678	active	2025-04-10 16:00:00
2	4	SucursalDos	direccion ciudad	12345678	active	2025-04-10 16:00:00
\.


--
-- TOC entry 5058 (class 0 OID 16575)
-- Dependencies: 230
-- Data for Name: branchusers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branchusers (branch_user_id, user_id, branch_id, assigned_date, status) FROM stdin;
1	1	2	2025-04-10 22:00:00	active
\.


--
-- TOC entry 5060 (class 0 OID 16595)
-- Dependencies: 232
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (category_id, company_id, category_name, description) FROM stdin;
1	1	Celular	Telefono celular o Smartphone
2	2	Café	Cafe Huehue 
\.


--
-- TOC entry 5054 (class 0 OID 16540)
-- Dependencies: 226
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (company_id, user_id, company_name, contact_email, contact_phone, address, registration_date, status) FROM stdin;
1	5	firstComapny	j@email.com	42030048	direccion en otro universo	2025-04-09 10:00:00	active
2	5	firstComapny	j@email.com	42030048	direccion en otro universo	2025-04-09 10:00:00	active
3	5	firstComapny	j@email.com	42030048	direccion en otro universo	2025-04-09 10:00:00	active
4	2	sComapny	j@email.com	42030048	direccion en otro universo	2025-04-09 10:00:00	active
\.


--
-- TOC entry 5064 (class 0 OID 16631)
-- Dependencies: 236
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory (inventory_id, company_id, branch_id, product_id, quantity, last_updated) FROM stdin;
\.


--
-- TOC entry 5072 (class 0 OID 16708)
-- Dependencies: 244
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (payment_id, sale_id, payment_method, amount, payment_date) FROM stdin;
\.


--
-- TOC entry 5050 (class 0 OID 16506)
-- Dependencies: 222
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plans (plan_id, plan_name, price_monthly, price_yearly, max_users, max_branches, features, status, creation_date) FROM stdin;
1	Basic	10.00	100.00	5	1	{\n    "RRHHH": [\n        {\n            "id": 1,\n            "name": "Empleados",\n            "description": "Empleados",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 2,\n            "name": "Nominas",\n            "description": "Nominas",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 3,\n            "name": "Vacaciones",\n            "description": "Vacaciones",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 4,\n            "name": "Pagos",\n            "description": "Pagos",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 5,\n            "name": "Permisos",\n            "description": "Permisos",\n            "icon": "fa-solid fa-users"\n        }\n    ],\n    "Finance": [\n        {\n            "id": 1,\n            "name": "Ventas_Compras",\n            "description": "Ventas_Compras",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 2,\n            "name": "Gastos",\n            "description": "Gastos",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 3,\n            "name": "Inventario",\n            "description": "Inventario",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 4,\n            "name": "Reportes",\n            "description": "Reposrtes",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 5,\n            "name": "Facturas",\n            "description": "Facturas",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 6,\n            "name": "Productos",\n            "description": "Productos",\n            "icon": "fa-solid fa-users"\n        }\n        \n    ]\n}	active	2025-04-01 20:12:52.117777
2	Standard	20.00	200.00	10	3	{\n    "RRHHH": [\n        {\n            "id": 1,\n            "name": "Empleados",\n            "description": "Empleados",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 2,\n            "name": "Nominas",\n            "description": "Nominas",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 3,\n            "name": "Vacaciones",\n            "description": "Vacaciones",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 4,\n            "name": "Pagos",\n            "description": "Pagos",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 5,\n            "name": "Permisos",\n            "description": "Permisos",\n            "icon": "fa-solid fa-users"\n        }\n    ],\n    "Finance": [\n        {\n            "id": 1,\n            "name": "Ventas_Compras",\n            "description": "Ventas_Compras",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 2,\n            "name": "Gastos",\n            "description": "Gastos",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 3,\n            "name": "Inventario",\n            "description": "Inventario",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 4,\n            "name": "Reportes",\n            "description": "Reposrtes",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 5,\n            "name": "Facturas",\n            "description": "Facturas",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 6,\n            "name": "Productos",\n            "description": "Productos",\n            "icon": "fa-solid fa-users"\n        }\n        \n    ]\n}	active	2025-04-01 20:12:52.117777
3	Premium	50.00	500.00	\N	\N	{\n    "RRHHH": [\n        {\n            "id": 1,\n            "name": "Empleados",\n            "description": "Empleados",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 2,\n            "name": "Nominas",\n            "description": "Nominas",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 3,\n            "name": "Vacaciones",\n            "description": "Vacaciones",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 4,\n            "name": "Pagos",\n            "description": "Pagos",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 5,\n            "name": "Permisos",\n            "description": "Permisos",\n            "icon": "fa-solid fa-users"\n        }\n    ],\n    "Finance": [\n        {\n            "id": 1,\n            "name": "Ventas_Compras",\n            "description": "Ventas_Compras",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 2,\n            "name": "Gastos",\n            "description": "Gastos",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 3,\n            "name": "Inventario",\n            "description": "Inventario",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 4,\n            "name": "Reportes",\n            "description": "Reposrtes",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 5,\n            "name": "Facturas",\n            "description": "Facturas",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 6,\n            "name": "Productos",\n            "description": "Productos",\n            "icon": "fa-solid fa-users"\n        }\n        \n    ]\n}	active	2025-04-01 20:12:52.117777
4	Enterprise	100.00	1000.00	\N	\N	{\n    "RRHHH": [\n        {\n            "id": 1,\n            "name": "Empleados",\n            "description": "Empleados",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 2,\n            "name": "Nominas",\n            "description": "Nominas",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 3,\n            "name": "Vacaciones",\n            "description": "Vacaciones",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 4,\n            "name": "Pagos",\n            "description": "Pagos",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 5,\n            "name": "Permisos",\n            "description": "Permisos",\n            "icon": "fa-solid fa-users"\n        }\n    ],\n    "Finance": [\n        {\n            "id": 1,\n            "name": "Ventas_Compras",\n            "description": "Ventas_Compras",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 2,\n            "name": "Gastos",\n            "description": "Gastos",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 3,\n            "name": "Inventario",\n            "description": "Inventario",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 4,\n            "name": "Reportes",\n            "description": "Reposrtes",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 5,\n            "name": "Facturas",\n            "description": "Facturas",\n            "icon": "fa-solid fa-users"\n        },\n        {\n            "id": 6,\n            "name": "Productos",\n            "description": "Productos",\n            "icon": "fa-solid fa-users"\n        }\n        \n    ]\n}	active	2025-04-01 20:12:52.117777
\.


--
-- TOC entry 5062 (class 0 OID 16609)
-- Dependencies: 234
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, company_id, category_id, product_code, product_name, description, cost_price, sale_price, status, creation_date) FROM stdin;
\.


--
-- TOC entry 5046 (class 0 OID 16476)
-- Dependencies: 218
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (role_id, role_name, description) FROM stdin;
1	company_admin	company_admin
2	branch_user	branch_user
3	registered_user	registered_user
4	admin	admin
\.


--
-- TOC entry 5068 (class 0 OID 16677)
-- Dependencies: 240
-- Data for Name: saledetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saledetails (detail_id, sale_id, product_id, quantity, unit_price, subtotal) FROM stdin;
\.


--
-- TOC entry 5066 (class 0 OID 16654)
-- Dependencies: 238
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales (sale_id, company_id, branch_id, user_id, sale_date, total) FROM stdin;
\.


--
-- TOC entry 5052 (class 0 OID 16520)
-- Dependencies: 224
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (subscription_id, user_id, plan_id, start_date, end_date, status, payment_method) FROM stdin;
8	1	4	2025-04-03 10:00:00	2025-04-03 10:00:00	cancelled	cash
9	5	4	2025-04-03 10:00:00	2025-04-03 10:00:00	active	cash
10	2	1	2025-04-10 16:00:00	2025-04-10 16:00:00	active	cash
\.


--
-- TOC entry 5070 (class 0 OID 16694)
-- Dependencies: 242
-- Data for Name: suppliers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suppliers (supplier_id, company_id, supplier_name, phone, email, address) FROM stdin;
\.


--
-- TOC entry 5048 (class 0 OID 16487)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password, role_id, status, creation_date) FROM stdin;
5	Josue Garcia Monterroso	j.emanuel.gm@outlook.com	$2b$10$y9PLKJZhPEGbqmNPplJBsuVKm/cYKqCGRet4mPNvfEttdL.zCWeQq	3	active	2025-04-02 23:02:24.185
1	company_admin	company_admin@example.com	$2b$10$y9PLKJZhPEGbqmNPplJBsuVKm/cYKqCGRet4mPNvfEttdL.zCWeQq	1	active	2025-04-01 20:10:53.658217
2	branch_user	branch_user@example.com	$2b$10$y9PLKJZhPEGbqmNPplJBsuVKm/cYKqCGRet4mPNvfEttdL.zCWeQq	2	active	2025-04-01 20:10:53.658217
3	registered_user	registered_user@example.com	$2b$10$y9PLKJZhPEGbqmNPplJBsuVKm/cYKqCGRet4mPNvfEttdL.zCWeQq	3	active	2025-04-01 20:10:53.658217
4	Admin	Admin@example.com	$2b$10$y9PLKJZhPEGbqmNPplJBsuVKm/cYKqCGRet4mPNvfEttdL.zCWeQq	4	active	2025-04-01 20:10:53.658217
6	Juan Example	example@example.com	$2b$10$anbhW2KWhf3OS.r7MordRui0ER9r4MLNH4rq8JwzyAlJ53jveiyTe	3	active	2025-04-03 15:03:41.707
7	Juan Example	example2@example.com	$2b$10$iNUvG7N/zLutSmne8M7Y0uXJIKLXlb6oPDGtnzh05i3S6Latp4D8u	3	active	2025-04-03 15:05:16.973
8	Juan Example	example3@example.com	$2b$10$IGcLIhlTrTUMiY5hI.jgouwSzeeMdKuQ9ee0N2gBjX2cpa9uwfNm.	3	active	2025-04-03 15:06:42.386
9	name	email@example.com	$2b$10$wm/iHpgNJLDHFhN7Uuo7YugL.TwTok9yyYOkHzPC0feJt18h5S3x6	3	active	2025-04-10 16:59:12.699
10	JoshGarcia	vampiro6900@gmail.com	$2b$10$kyJODMWgxSgvv3gXTAtdJe1fju87VEM4.xGyPmFMfYNdAIqmJEef2	3	active	2025-06-25 19:45:52.906
\.


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 227
-- Name: branches_branch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.branches_branch_id_seq', 2, true);


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 229
-- Name: branchusers_branch_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.branchusers_branch_user_id_seq', 1, true);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 231
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 2, true);


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 225
-- Name: companies_company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_company_id_seq', 4, true);


--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 235
-- Name: inventory_inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_inventory_id_seq', 1, false);


--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 243
-- Name: payments_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_payment_id_seq', 1, false);


--
-- TOC entry 5098 (class 0 OID 0)
-- Dependencies: 221
-- Name: plans_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plans_plan_id_seq', 4, true);


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 233
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 1, false);


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 217
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 4, true);


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 239
-- Name: saledetails_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saledetails_detail_id_seq', 1, false);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 237
-- Name: sales_sale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_sale_id_seq', 1, false);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 223
-- Name: subscriptions_subscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscriptions_subscription_id_seq', 10, true);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 241
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suppliers_supplier_id_seq', 1, false);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 10, true);


--
-- TOC entry 4863 (class 2606 OID 16567)
-- Name: branches branches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_pkey PRIMARY KEY (branch_id);


--
-- TOC entry 4865 (class 2606 OID 16583)
-- Name: branchusers branchusers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchusers
    ADD CONSTRAINT branchusers_pkey PRIMARY KEY (branch_user_id);


--
-- TOC entry 4867 (class 2606 OID 16602)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4861 (class 2606 OID 16550)
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (company_id);


--
-- TOC entry 4871 (class 2606 OID 16637)
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (inventory_id);


--
-- TOC entry 4879 (class 2606 OID 16715)
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);


--
-- TOC entry 4855 (class 2606 OID 16516)
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (plan_id);


--
-- TOC entry 4857 (class 2606 OID 16518)
-- Name: plans plans_plan_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_plan_name_key UNIQUE (plan_name);


--
-- TOC entry 4869 (class 2606 OID 16619)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 4847 (class 2606 OID 16483)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4849 (class 2606 OID 16485)
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- TOC entry 4875 (class 2606 OID 16682)
-- Name: saledetails saledetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saledetails
    ADD CONSTRAINT saledetails_pkey PRIMARY KEY (detail_id);


--
-- TOC entry 4873 (class 2606 OID 16660)
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (sale_id);


--
-- TOC entry 4859 (class 2606 OID 16528)
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (subscription_id);


--
-- TOC entry 4877 (class 2606 OID 16701)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (supplier_id);


--
-- TOC entry 4851 (class 2606 OID 16499)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4853 (class 2606 OID 16497)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4884 (class 2606 OID 16568)
-- Name: branches branches_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branches
    ADD CONSTRAINT branches_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id) ON DELETE CASCADE;


--
-- TOC entry 4885 (class 2606 OID 16589)
-- Name: branchusers branchusers_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchusers
    ADD CONSTRAINT branchusers_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON DELETE CASCADE;


--
-- TOC entry 4886 (class 2606 OID 16584)
-- Name: branchusers branchusers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchusers
    ADD CONSTRAINT branchusers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4887 (class 2606 OID 16603)
-- Name: categories categories_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id) ON DELETE CASCADE;


--
-- TOC entry 4883 (class 2606 OID 16551)
-- Name: companies companies_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4890 (class 2606 OID 16643)
-- Name: inventory inventory_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON DELETE CASCADE;


--
-- TOC entry 4891 (class 2606 OID 16638)
-- Name: inventory inventory_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id) ON DELETE CASCADE;


--
-- TOC entry 4892 (class 2606 OID 16648)
-- Name: inventory inventory_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE CASCADE;


--
-- TOC entry 4899 (class 2606 OID 16716)
-- Name: payments payments_sale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.sales(sale_id) ON DELETE CASCADE;


--
-- TOC entry 4888 (class 2606 OID 16625)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;


--
-- TOC entry 4889 (class 2606 OID 16620)
-- Name: products products_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id) ON DELETE CASCADE;


--
-- TOC entry 4896 (class 2606 OID 16688)
-- Name: saledetails saledetails_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saledetails
    ADD CONSTRAINT saledetails_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON DELETE CASCADE;


--
-- TOC entry 4897 (class 2606 OID 16683)
-- Name: saledetails saledetails_sale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saledetails
    ADD CONSTRAINT saledetails_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.sales(sale_id) ON DELETE CASCADE;


--
-- TOC entry 4893 (class 2606 OID 16666)
-- Name: sales sales_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branches(branch_id) ON DELETE CASCADE;


--
-- TOC entry 4894 (class 2606 OID 16661)
-- Name: sales sales_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id) ON DELETE CASCADE;


--
-- TOC entry 4895 (class 2606 OID 16671)
-- Name: sales sales_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4881 (class 2606 OID 16534)
-- Name: subscriptions subscriptions_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plans(plan_id) ON DELETE CASCADE;


--
-- TOC entry 4882 (class 2606 OID 16529)
-- Name: subscriptions subscriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 4898 (class 2606 OID 16702)
-- Name: suppliers suppliers_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id) ON DELETE CASCADE;


--
-- TOC entry 4880 (class 2606 OID 16500)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE CASCADE;


-- Completed on 2025-07-24 15:23:33

--
-- PostgreSQL database dump complete
--

