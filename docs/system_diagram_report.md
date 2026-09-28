# The Glam Factory — Full System Architecture & Diagram Report

A comprehensive technical architecture report and visual system specification for **The Glam Factory**, an enterprise-grade luxury salon booking and salon operations management platform built on Next.js 14, Prisma ORM, PostgreSQL, NextAuth.js, and Razorpay.

---

## 1. High-Level System Architecture

This diagram illustrates the multi-tier topology: Client presentation tier, Edge middleware routing, Next.js Server App Router, Prisma ORM abstraction, PostgreSQL database, and 3rd-party integration services (Razorpay, WhatsApp Business API, and Email/SMS).

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#E91E63', 'secondaryColor': '#C9A96E', 'fontFamily': 'Inter, sans-serif'}}}%%
flowchart TB
    subgraph ClientLayer["1. Client Tier (Browser)"]
        direction TB
        PUB["Public Visitors (Home, Services, Gallery, Offers)"]
        BOOK_UI["Customer Booking Funnel (6 Steps)"]
        CUST_UI["Customer Portal (/account/*)"]
        ADMIN_UI["Salon Admin Dashboard (/admin/*)"]
    end

    subgraph EdgeLayer["2. Edge & Security Tier"]
        direction TB
        MW["Next.js Edge Middleware (middleware.ts)"]
        AUTH_GUARD{"Role & Session Verifier\n(JWT & Route Matching)"}
        MW --> AUTH_GUARD
    end

    subgraph ServerLayer["3. Next.js 14 Server Engine (App Router)"]
        direction TB
        R_PUB["Public Route Handlers & RSC"]
        R_BOOK["Booking Engine & Availability Service"]
        R_ADMIN["Admin Management APIs & Actions"]
        R_AUTH["NextAuth v5 Auth Handler (/api/auth)"]
        PRISMA_CLIENT["Prisma ORM Client (@prisma/client)"]
        
        R_PUB --> PRISMA_CLIENT
        R_BOOK --> PRISMA_CLIENT
        R_ADMIN --> PRISMA_CLIENT
        R_AUTH --> PRISMA_CLIENT
    end

    subgraph StorageLayer["4. Data Storage Tier"]
        DB[("PostgreSQL Database (Neon DB)\n- 25+ Models & 10 Enums")]
    end

    subgraph ExternalLayer["5. External Cloud Services"]
        RZP["Razorpay Payment Gateway API"]
        WA["WhatsApp Business Cloud API"]
        COMM["SMS & Email Notification Provider"]
    end

    %% Connections
    ClientLayer --> MW
    AUTH_GUARD -->|Public Access| R_PUB
    AUTH_GUARD -->|Authenticated Customer| R_BOOK
    AUTH_GUARD -->|Role == CUSTOMER| CUST_UI
    AUTH_GUARD -->|Role == ADMIN| R_ADMIN
    AUTH_GUARD -->|Auth Endpoints| R_AUTH

    PRISMA_CLIENT <--> DB

    R_BOOK <-->|Create Orders / Verify Signatures| RZP
    R_ADMIN <-->|Manage Payments| RZP
    R_BOOK -->|Trigger Booking Confirmations| WA
    R_BOOK -->|Trigger Alerts| COMM
```

---

## 2. Technology Stack Landscape

A complete mindmap detailing frontend, backend, database, state management, security, and infrastructure layers.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#E91E63', 'secondaryColor': '#C9A96E'}}}%%
mindmap
  root((The Glam Factory<br/>Technology Ecosystem))
    Frontend Architecture
      Framework: Next.js 14 (App Router)
      Library: React 18
      Language: TypeScript 5.3
      Styling: Tailwind CSS 3.4
      Components: Radix UI Primitives + Lucide Icons
      Animation: Framer Motion
      Notifications: React Hot Toast
    State & Forms
      Client Booking Store: Zustand (Persistent)
      Forms: React Hook Form
      Schema Validation: Zod
    Backend & APIs
      Runtime: Node.js (Next.js Server Actions & API Routes)
      ORM: Prisma 5.10
      Auth: NextAuth.js v5 (JWT & Credentials)
      Password Hashing: bcryptjs
      Payment Gateway: Razorpay SDK
    Database
      Engine: PostgreSQL (Neon Serverless)
      Migrations: Prisma Migrate
      Seeding: tsx prisma/seed.ts
      Connection Pooling: Neon /pg
    DevOps & Testing
      E2E Testing: Playwright
      Unit/Integration: Vitest
      Code Quality: ESLint + Prettier
```

---

## 3. Comprehensive Entity-Relationship Diagram (Database Schema)

The database schema manages user accounts, role definitions, stylists and dynamic shift availabilities, service categories with modular add-ons, multi-item bookings, payment receipts, wallet balance ledger, loyalty rewards, referral programs, promotional vouchers, customer memberships, and customer reviews.

```mermaid
erDiagram
    %% Entities & Relations
    USER ||--o| STYLIST : "has profile (if STYLIST)"
    USER ||--o{ BOOKING : "places"
    USER ||--o{ PAYMENT : "makes"
    USER ||--o| WALLET : "owns"
    USER ||--o{ LOYALTY_TRANSACTION : "earns/redeems"
    USER ||--o{ MEMBERSHIP : "subscribes"
    USER ||--o{ REFERRAL : "acts as referrer"
    USER ||--o{ REFERRAL : "acts as referee"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ REVIEW : "writes"

    STYLIST ||--o{ STYLIST_AVAILABILITY : "maintains"
    STYLIST ||--o{ STYLIST_SERVICE : "specializes in"
    STYLIST ||--o{ BOOKING : "assigned to"
    STYLIST ||--o{ REVIEW : "evaluated in"

    SERVICE_CATEGORY ||--o{ SERVICE : "categorizes"
    SERVICE ||--o{ SERVICE_ADDON : "offers options"
    SERVICE ||--o{ STYLIST_SERVICE : "mapped to"
    SERVICE ||--o{ BOOKING_SERVICE : "included in"
    SERVICE ||--o{ OFFER_SERVICE : "discounted via"

    BOOKING ||--o{ BOOKING_SERVICE : "contains services"
    BOOKING ||--o{ BOOKING_ADDON : "contains add-ons"
    BOOKING ||--o| PAYMENT : "reconciled with"
    BOOKING ||--o| REVIEW : "rated through"

    WALLET ||--o{ WALLET_TRANSACTION : "logs entries"

    MEMBERSHIP_PLAN ||--o{ MEMBERSHIP : "defines tier"
    MEMBERSHIP ||--o{ MEMBERSHIP_PAYMENT : "bills"

    REFERRAL_PROGRAM ||--o{ REFERRAL : "governs"
    NOTIFICATION_TEMPLATE ||--o{ NOTIFICATION : "formats"
    OFFER ||--o{ OFFER_SERVICE : "applies to"

    %% Attribute specifications
    USER {
        string id PK
        string email UK
        string passwordHash
        string name
        string phone
        string avatarUrl
        UserRole role "CUSTOMER | ADMIN | STYLIST"
        boolean isVerified
        string referralCode UK
    }

    STYLIST {
        string id PK
        string userId FK
        string bio
        int experience
        string[] specialization
        float avgRating
        int totalReviews
        boolean isActive
        float commissionRate
    }

    STYLIST_AVAILABILITY {
        string id PK
        string stylistId FK
        int dayOfWeek "0-6"
        string startTime
        string endTime
        boolean isAvailable
    }

    SERVICE {
        string id PK
        string categoryId FK
        string name
        string slug UK
        float price
        int duration "minutes"
        float discountPrice
        boolean isActive
    }

    BOOKING {
        string id PK
        string userId FK
        string stylistId FK
        datetime scheduledAt
        BookingStatus status "PENDING|CONFIRMED|IN_PROGRESS|COMPLETED|CANCELLED|NO_SHOW"
        float totalAmount
        float discount
        float finalAmount
        PaymentStatus paymentStatus "PENDING|PAID|PARTIALLY_PAID|REFUNDED|FREE"
    }

    PAYMENT {
        string id PK
        string bookingId FK
        string userId FK
        float amount
        PaymentMethod method "CASH|CARD|UPI|WALLET|RAZORPAY"
        string razorpayOrderId
        string razorpayPaymentId
        PaymentStatus status
    }

    WALLET {
        string id PK
        string userId FK
        float balance
        float totalEarned
        float totalRedeemed
    }

    MEMBERSHIP {
        string id PK
        string userId FK
        string planId FK
        datetime startDate
        datetime endDate
        MembershipStatus status "ACTIVE|EXPIRED|CANCELLED|SUSPENDED"
    }

    REVIEW {
        string id PK
        string userId FK
        string bookingId FK
        string stylistId FK
        int rating
        string comment
        boolean isApproved
        boolean isFeatured
    }
```

---

## 4. Authentication, Middleware & Route Access Security

The Next.js edge middleware checks user sessions, decodes JWT payloads, validates role permissions, and controls routing flow between public pages, customer accounts, and the administrator backend.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#E91E63', 'secondaryColor': '#C9A96E'}}}%%
flowchart TD
    START([User Enters URL / Action]) --> MW[Next.js Edge Middleware]
    
    MW --> CHECK_AUTH{Session Token Present?}
    
    %% Unauthenticated flow
    CHECK_AUTH -->|No| GUEST_PATH{Target Route Type?}
    GUEST_PATH -->|/admin/* or /account/*| REDIR_LOGIN[Redirect to /auth/login]
    GUEST_PATH -->|/auth/* or Public /| ALLOW_PUBLIC[Allow Access to Public Pages]

    %% Authenticated flow
    CHECK_AUTH -->|Yes (Valid JWT)| ROLE_CHECK{Evaluate User Role}
    
    ROLE_CHECK -->|Role: ADMIN| ADMIN_ACCESS{Target Route?}
    ADMIN_ACCESS -->|/auth/*| REDIR_ADMIN[Redirect to /admin]
    ADMIN_ACCESS -->|/admin/*| ALLOW_ADMIN[Allow Access: Admin Console]
    ADMIN_ACCESS -->|Any other route| ALLOW_COMMON[Allow Standard Access]

    ROLE_CHECK -->|Role: CUSTOMER| CUST_ACCESS{Target Route?}
    CUST_ACCESS -->|/admin/*| DENY_ADMIN[Access Denied: Redirect to /account]
    CUST_ACCESS -->|/auth/*| REDIR_ACCOUNT[Redirect to /account]
    CUST_ACCESS -->|/account/* or /booking/*| ALLOW_CUST[Allow Access: Customer Space]

    style REDIR_LOGIN fill:#ffebee,stroke:#F44336
    style DENY_ADMIN fill:#ffebee,stroke:#F44336
    style ALLOW_ADMIN fill:#e8f5e9,stroke:#4CAF50
    style ALLOW_CUST fill:#e8f5e9,stroke:#4CAF50
    style ALLOW_PUBLIC fill:#e3f2fd,stroke:#2196F3
```

---

## 5. Customer 6-Step Booking Funnel & Zustand State Store

The booking flow uses a client-side Zustand store with local storage persistence (`booking-storage`), allowing customers to step back and forth through the 6 stages without state loss.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#E91E63', 'secondaryColor': '#C9A96E'}}}%%
flowchart LR
    subgraph Funnel["6-Step Booking Funnel"]
        S1["Step 1: Category\n(/booking)"]
        S2["Step 2: Service & Add-Ons\n(/booking/service)"]
        S3["Step 3: Stylist Selection\n(/booking/stylist)"]
        S4["Step 4: Date & Slot\n(/booking/datetime)"]
        S5["Step 5: Customer Details\n(/booking/details)"]
        S6["Step 6: Confirmation\n(/booking/confirm)"]
        SUCCESS["Success Page\n(/booking/success)"]
    end

    subgraph Store["Zustand Persistent Store (useBookingStore)"]
        direction TB
        ST_STATE["State Schema:\n• category: string\n• service: Service\n• addOns: string[]\n• stylist: Stylist\n• date: YYYY-MM-DD\n• time: HH:mm\n• customer: Info"]
        ST_CALC["Computed Helpers:\n• getTotalPrice()\n• getTotalDuration()"]
    end

    S1 -->|setCategory()| S2
    S2 -->|setService(), toggleAddOn()| S3
    S3 -->|setStylist()| S4
    S4 -->|setDateTime()| S5
    S5 -->|setCustomer()| S6
    S6 -->|Post to API + reset()| SUCCESS

    S1 -.-> Store
    S2 -.-> Store
    S3 -.-> Store
    S4 -.-> Store
    S5 -.-> Store
    S6 -.-> Store

    style S1 fill:#fce4ec,stroke:#E91E63
    style S6 fill:#fce4ec,stroke:#E91E63
    style SUCCESS fill:#e8f5e9,stroke:#4CAF50
    style Store fill:#fff8e1,stroke:#FFA000
```

---

## 6. Booking Lifecycle State Machine

Each appointment follows a strict state transition model from initial creation through salon service execution and post-service follow-up.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#E91E63', 'secondaryColor': '#C9A96E'}}}%%
stateDiagram-v2
    [*] --> PENDING : Customer books slot

    PENDING --> CONFIRMED : Payment verified or Admin approves
    PENDING --> CANCELLED : Customer / Admin cancels

    CONFIRMED --> IN_PROGRESS : Customer checks in at salon
    CONFIRMED --> CANCELLED : Cancelled before appointment window
    CONFIRMED --> NO_SHOW : Customer misses scheduled time

    IN_PROGRESS --> COMPLETED : Stylist completes service
    
    COMPLETED --> REVIEWED : Customer submits rating & feedback
    COMPLETED --> [*] : Loyalty points credited & Wallet updated
    
    CANCELLED --> [*] : Slot released & refund / credit note issued
    NO_SHOW --> [*] : Slot forfeited
```

---

## 7. Dual Payment Pipeline: Razorpay vs. Offline Settlement

The payment architecture supports immediate online settlement via Razorpay webhook/signature verification and offline settlement (Cash/UPI/Card at the salon desk) with automated loyalty credit.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#E91E63', 'secondaryColor': '#C9A96E'}}}%%
sequenceDiagram
    autonumber
    actor Customer
    participant BookingUI as Booking Web App
    participant Server as Next.js Backend
    participant RZP as Razorpay Gateway
    participant DB as PostgreSQL (Prisma)
    participant Notif as Notification Service

    Customer->>BookingUI: Selects Payment Method & Clicks 'Pay/Book'
    
    alt Method == RAZORPAY (Online Payment)
        BookingUI->>Server: POST /api/payments/create-order
        Server->>RZP: razorpay.orders.create({amount, currency: 'INR'})
        RZP-->>Server: Returns order_id
        Server-->>BookingUI: Returns order details + Razorpay Key
        BookingUI->>Customer: Opens Razorpay Checkout Modal
        Customer->>RZP: Completes Payment (UPI / Card / NetBanking)
        RZP-->>BookingUI: Returns {razorpay_payment_id, razorpay_signature}
        BookingUI->>Server: POST /api/payments/verify
        Server->>Server: Verify cryptographic HMAC SHA256 signature
        Server->>DB: Update Booking (CONFIRMED) & Payment (PAID)
        Server->>DB: Credit Loyalty Points (₹10 spent = 1 point)
    else Method == OFFLINE (Cash / Salon UPI / Desk Card)
        BookingUI->>Server: POST /api/bookings/offline-checkout
        Server->>DB: Create Booking (CONFIRMED/PENDING) & Payment (PENDING)
    end

    Server->>Notif: Trigger WhatsApp & Email confirmation message
    Notif-->>Customer: Booking Confirmation Details & Invoice
    Server-->>BookingUI: Redirect to /booking/success
```

---

## 8. Multi-Channel Notification & Queue Pipeline

The platform uses event triggers to select dynamic templates and dispatch messages across WhatsApp, Email, SMS, and in-app feeds with retries and dead-letter queue (DLQ) safeguards.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#E91E63', 'secondaryColor': '#C9A96E'}}}%%
flowchart TD
    subgraph Triggers["Event Triggers"]
        T1["Appointment Confirmed"]
        T2["24h & 2h Appointment Reminders"]
        T3["Service Completed (Feedback Request)"]
        T4["Payment Success & Invoice Receipt"]
        T5["Loyalty Points / Tier Upgrade"]
        T6["Referral Bonus Earned"]
    end

    subgraph TemplateEngine["Template & Rule Engine"]
        ENG["Notification Engine\n(Loads DB NotificationTemplate)"]
        VARS["Variable Injection:\n{customer_name}, {service_name},\n{stylist_name}, {date_time}, {amount}"]
    end

    subgraph Channels["Dispatch Channels"]
        CH_WA["WhatsApp Business API\n(Interactive Templates & Buttons)"]
        CH_EMAIL["Transactional Email\n(HTML Branded Receipts)"]
        CH_SMS["SMS Gateway\n(Immediate DLT-Approved Alerts)"]
        CH_INAPP["In-App Notification Feed\n(User Dashboard /account)"]
    end

    subgraph Reliability["Queue & Reliability Layer"]
        DISPATCH{"Delivery Status"}
        RETRY["Retry Worker (Up to 3x)"]
        DLQ["Dead Letter Queue (DLQ)\nAdmin Alert Raised"]
        SUCCESS_LOG[("Audit Log Saved (status: SENT)")]
    end

    Triggers --> ENG
    ENG --> VARS
    VARS --> CH_WA
    VARS --> CH_EMAIL
    VARS --> CH_SMS
    VARS --> CH_INAPP

    CH_WA --> DISPATCH
    CH_EMAIL --> DISPATCH
    CH_SMS --> DISPATCH
    CH_INAPP --> DISPATCH

    DISPATCH -->|Success| SUCCESS_LOG
    DISPATCH -->|Transient Fail| RETRY
    RETRY -->|Retry Succeeded| SUCCESS_LOG
    RETRY -->|3 Failures| DLQ

    style Triggers fill:#fce4ec,stroke:#E91E63
    style SUCCESS_LOG fill:#e8f5e9,stroke:#4CAF50
    style DLQ fill:#ffebee,stroke:#F44336
```

---

## 9. Admin Operations & Management Hierarchy

The admin interface is structured into dedicated operational suites with real-time analytics and management capabilities.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#E91E63', 'secondaryColor': '#C9A96E'}}}%%
graph TD
    ADMIN["The Glam Factory Admin Console (/admin)"]

    ADMIN --> DASH["Executive Dashboard\n• Revenue KPIs\n• Today's Appointments\n• Utilization & Top Services"]
    ADMIN --> OPS["Operational Suite"]
    ADMIN --> CUST_SUITE["Customer & Growth Suite"]
    ADMIN --> SYS["System & Configuration"]

    OPS --> A1["Appointments (/admin/appointments)\n• Calendar & List views\n• Status overrides & reschedule"]
    OPS --> A2["Services Catalog (/admin/services)\n• Category hierarchies\n• Pricing & Duration\n• Add-On management"]
    OPS --> A3["Staff & Stylists (/admin/staff)\n• Weekly Shift Availability\n• Commission rates & ratings"]

    CUST_SUITE --> C1["Customer CRM (/admin/customers)\n• Profiles & appointment history\n• Total lifetime spend"]
    CUST_SUITE --> C2["Memberships (/admin/memberships)\n• VIP Tier creation\n• Renewal tracking"]
    CUST_SUITE --> C3["Promotions & Offers (/admin/offers)\n• Percentage & BOGO rules\n• Coupon usage quotas"]
    CUST_SUITE --> C4["Reviews & Ratings (/admin/reviews)\n• Moderation & feature flags"]

    SYS --> S1["Payments & Invoicing (/admin/payments)\n• Gateway reconciliation\n• Refund management"]
    SYS --> S2["Visual Gallery (/admin/gallery)\n• Before/After transformations"]
    SYS --> S3["Site Settings (/admin/settings)\n• Business hours & Contact info\n• Notifications & Branding"]

    style ADMIN fill:#fce4ec,stroke:#E91E63,stroke-width:2px
    style DASH fill:#e8f5e9,stroke:#4CAF50
    style OPS fill:#e3f2fd,stroke:#1976D2
    style CUST_SUITE fill:#fff3e0,stroke:#FF9800
    style SYS fill:#f3e5f5,stroke:#9C27B0
```

---

## 10. Application Directory & Component Architecture

Next.js App Router layout structuring public routes, customer protected routes, admin protected routes, and shared UI component dependencies:

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#E91E63', 'secondaryColor': '#C9A96E'}}}%%
flowchart TD
    ROOT["the-glam-factory/"]

    subgraph AppRoutes["app/ (App Router)"]
        PUB_GROUP["(public)/ : Public Marketing Site\n• Home, About, Services, Gallery, Offers, Team, Contact"]
        CUST_GROUP["(customer)/account/ : Customer Portal\n• Overview, Appointments, Loyalty, Membership, Offers, Profile"]
        ADMIN_GROUP["(admin)/admin/ : Admin Management\n• Dashboard, Appointments, Customers, Services, Staff, Settings"]
        AUTH_ROUTES["auth/ : Authentication\n• login/page.tsx, register/page.tsx"]
        BOOKING_ROUTES["booking/ : Step-by-Step Funnel\n• service, stylist, datetime, details, confirm, success"]
        API_ROUTES["api/ : Server Handlers\n• auth/register, booking, payments, webhooks"]
    end

    subgraph CoreLib["lib/ & stores/ (Business Logic & State)"]
        AUTH_LIB["lib/auth/ : NextAuth v5 Configuration & Helpers"]
        DB_LIB["lib/db/prisma.ts : Global Prisma Client Singleton"]
        UTILS["lib/utils.ts : cn(), formatting & validators"]
        ZUSTAND["stores/booking-store.ts : Persistent Booking Store"]
    end

    subgraph UIComponents["components/ (Design System & Widgets)"]
        RADIX["components/ui/ : Radix & Tailwind Atomic UI\n(Button, Dialog, Card, Input, Select, Toast, Table)"]
        PUB_COMPS["components/public/ : Public Widgets\n(Navbar, Footer, Hero, ServiceCard, TestimonialCard)"]
        BOOK_COMPS["components/booking/ : Funnel Controls\n(StepIndicator, StylistSelector, SlotPicker)"]
    end

    subgraph DBPrisma["prisma/ (Database Layer)"]
        SCHEMA["schema.prisma : 25+ Models & Postgres Config"]
        SEED["seed.ts : Realistic Sample Data Seeder"]
    end

    ROOT --> AppRoutes
    ROOT --> CoreLib
    ROOT --> UIComponents
    ROOT --> DBPrisma

    AppRoutes --> CoreLib
    AppRoutes --> UIComponents
    CoreLib --> DBPrisma

    style ROOT fill:#fce4ec,stroke:#E91E63,stroke-width:2px
    style AppRoutes fill:#e8f5e9,stroke:#4CAF50
    style CoreLib fill:#fff3e0,stroke:#FF9800
    style UIComponents fill:#e3f2fd,stroke:#1976D2
    style DBPrisma fill:#f3e5f5,stroke:#9C27B0
```

---

## 11. Summary & Verification

| Architecture Domain | Technologies & Patterns Used | Key Benefit |
|---------------------|-----------------------------|-------------|
| **Frontend & UI** | Next.js 14 App Router, Radix UI, Tailwind CSS, Framer Motion | High visual fidelity, luxury salon branding, responsive on mobile & desktop |
| **State Management**| Zustand (`useBookingStore`) with local storage persistence | Frictionless 6-step booking without accidental data loss on refresh |
| **Authentication**  | NextAuth.js v5 with JWT session strategy & Edge Middleware | Role-based separation (`ADMIN`, `CUSTOMER`, `STYLIST`) with route guards |
| **Data & ORM**      | Prisma ORM with Neon PostgreSQL, 25 models, 10 enums | Strongly-typed relational schema with cascade deletes & indexed queries |
| **Payments**        | Razorpay SDK + Salon Offline Multi-Method Payments | Seamless online transactions, instant wallet balance and loyalty accrual |
| **Notifications**   | WhatsApp Cloud API, Email, SMS, In-App Notifications | Automated customer retention and instant booking confirmations |
