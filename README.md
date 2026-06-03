# Easy Attendance

A local-network desktop application for real-time church attendance counting. One laptop runs the app. Counters walk around with their phones, open a browser, and submit counts. The admin dashboard updates live — no internet required.

Built with Electron, Node.js, React, Prisma and SQLite.

---

## How It Works

``` bash
[Admin Laptop]
  └── Runs the app on the church Wi-Fi
  └── Opens the dashboard at localhost:3000
  └── Creates a service session and activates it

[Counter Devices — phones or tablets on the same Wi-Fi]
  └── Open a browser and go to the admin laptop's local IP
  └── Select their assigned section
  └── Enter Men, Women, and Children counts
  └── Submit

[Server — running on the admin laptop]
  └── Saves the submission to the local SQLite database
  └── Pushes an update to the dashboard via WebSocket

[Admin Dashboard]
  └── Updates live — totals, section breakdown, demographics
  └── Export to CSV at any time
```

No cloud. No subscriptions. No internet during a service.

---

## Features

- Create and activate service sessions
- Configure church sections (Main Hall, Balcony, Children's Wing, etc.)
- Real-time attendance updates via WebSockets
- Breakdown by section — Men, Women, Children counts
- Automatic total calculation
- CSV export per service
- Historical records — view past services
- Mobile-friendly counter interface
- Support for multiple services per day

---

## Tech Stack

| Layer | Technology |
|---|---|
| Desktop shell | Electron |
| Frontend | React, TypeScript, Vite, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | SQLite via Prisma ORM |
| Real-time | Socket.io |
| Export | csv-stringify |

---

## Project Structure

``` bash
easy-attendance/
├── electron/
│   └── main.ts              # Electron main process
├── app/
│   ├── client/              # React frontend (counter form + admin dashboard)
│   │   └── src/
│   │       ├── pages/       # CounterPage, AdminPage, HistoryPage
│   │       ├── components/  # Feature components and UI primitives
│   │       ├── hooks/       # useActiveService and other hooks
│   │       └── lib/         # API client, socket connection, utilities
│   └── server/              # Express backend
│       └── src/
│           ├── controllers/ # Request handlers
│           ├── services/    # Business logic
│           ├── routes/      # API route definitions
│           ├── sockets/     # WebSocket logic
│           ├── middleware/  # Validation middleware
│           └── config/      # Prisma client setup
├── docs/
│   ├── COMPONENTS.md        # Component documentation
│   ├── CONVENTIONS.md       # Code conventions and patterns
│   └── DEV_LOG.md           # Development journal
├── .env.example
├── package.json             # Root — Electron entry point and workspace config
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

Clone the repository:

```bash
git clone https://github.com/vicante-studio/Easy-Attendance.git
cd Easy-Attendance
```

Install all dependencies from the root:

```bash
npm install
```

Set up your environment variables. Copy the example file and edit if needed:

```bash
cp .env.example app/server/.env
```

The defaults work out of the box for local development — you only need to change them if you want a different port or database location.

Run Prisma migrations to set up the database:

```bash
cd app/server
npx prisma migrate deploy
cd ../..
```

### Running in Development

From the root:

```bash
npm run dev
```

This starts the Express server, the Vite dev server, and the Electron app concurrently. The admin dashboard opens automatically.

### Building a Distributable

To package the app as a native installer:

```bash
npm run package
```

Output goes to the `release/` folder. Supported targets:

| Platform | Format |
|---|---|
| Windows | NSIS installer (.exe) |
| macOS | DMG (.dmg) |
| Linux | AppImage (.AppImage) |

---

## Local Network Setup

This is how counters connect to the admin laptop during a service.

**Step 1** — Connect the admin laptop to the church Wi-Fi.

**Step 2** — Start the app on the admin laptop.

- The app automatically reads the IP and port from your .env file.
- Once running, the dashboard displays the full connection URL (e.g., 192.168.1.45:3000) at the top.

**Step 3** — Share the displayed IP address with counters.

- They open a browser and go to the URL shown on the dashboard.

**Step 4** — Counters see the submission form. Admin keeps the dashboard open on the laptop.

> All devices must be on the same Wi-Fi network. The app will not work across different networks or over mobile data.

---

## Usage Guide

### Admin

1. Open the app — the dashboard loads at `localhost:3000`
2. Go to the Admin panel and create your church sections if not already set up
3. Create a new service session and activate it
4. Share your laptop's local IP address with the counters
5. Watch submissions come in live on the dashboard
6. Export the CSV report when the service ends

### Counters

1. Connect your phone or tablet to the church Wi-Fi
2. Open a browser and go to the IP address the admin shared
3. Type your assigned section
4. Enter the count of Men, Women, and Children, and your name
5. Tap Submit — you'll see a confirmation

---

## CSV Export

The admin can export a full attendance report for any service. The CSV includes:

| Section | Men | Women | Children | Total | Counter Name |
|---|---|---|---|---|---|

The filename is generated automatically from the service name and date.

---

## Database Schema

### `services`

| Column | Type | Description |
|---|---|---|
| id | uuid | Unique identifier |
| name | text | Service name e.g. "First Service" |
| date | date | Date of the service |
| is_active | boolean | Whether this service is currently active |
| created_at | timestamp | When the record was created |

### `sections`

| Column | Type | Description |
|---|---|---|
| id | uuid | Unique identifier |
| name | text | Section name e.g. "Main Hall" |
| order | integer | Display order on the dashboard |
| created_at | timestamp | When the record was created |

### `attendance_submissions`

| Column | Type | Description |
|---|---|---|
| id | uuid | Unique identifier |
| service_id | uuid | Links to the services table |
| section_id | uuid | Links to the sections table |
| men | integer | Number of men counted |
| women | integer | Number of women counted |
| children | integer | Number of children counted |
| submitted_at | timestamp | When the submission was made |

---

## API Reference

### Services

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services` | Get all services |
| POST | `/api/services` | Create a new service |
| GET | `/api/services/:id` | Get a single service |
| PATCH | `/api/services/:id/activate` | Set a service as active |
| PUT | `/api/services/:id` | Update a service |
| DELETE | `/api/services/:id` | Delete a service |

### Sections

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/sections` | Get all sections |
| POST | `/api/sections` | Create a new section |
| PUT | `/api/sections/:id` | Update a section |
| DELETE | `/api/sections/:id` | Delete a section |

### Attendance

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/attendance` | Submit attendance (counters) |
| GET | `/api/attendance/:serviceId` | Get all submissions for a service |
| GET | `/api/attendance/:serviceId/totals` | Get aggregated totals by section |

### Export

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/export/:serviceId` | Download CSV report for a service |

### Utility

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/server-ip` | Get the server's local IP address |

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to report issues, suggest features, and submit pull requests.

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

*Built in Port Harcourt, Nigeria. Open-sourced because good tools shouldn't go to waste.*
