
├── .gitignore
├── app
│   ├── client
│   │   ├── .hintrc
│   │   ├── @
│   │   │   └── components
│   │   │       └── ui
│   │   ├── components.json
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── src
│   │   │   ├── App.css
│   │   │   ├── App.tsx
│   │   │   ├── components
│   │   │   │   ├── features
│   │   │   │   │   ├── attendance
│   │   │   │   │   ├── churchSection
│   │   │   │   │   │   ├── DeleteSection.tsx
│   │   │   │   │   │   └── EditSectionForm.tsx
│   │   │   │   │   ├── churchService
│   │   │   │   │   │   ├── DeleteServiceModal.tsx
│   │   │   │   │   │   └── EditServiceForm.tsx
│   │   │   │   │   ├── dashboards
│   │   │   │   │   │   ├── AttendanceDashboard.tsx
│   │   │   │   │   │   ├── SectionDashboard.tsx
│   │   │   │   │   │   └── ServiceDashboard.tsx
│   │   │   │   │   └── forms
│   │   │   │   │       ├── AttendanceForm.tsx
│   │   │   │   │       ├── SectionForm.tsx
│   │   │   │   │       └── ServiceForm.tsx
│   │   │   │   └── ui
│   │   │   │       ├── alert-dialog.tsx
│   │   │   │       ├── badge.tsx
│   │   │   │       ├── button.tsx
│   │   │   │       ├── card.tsx
│   │   │   │       ├── form
│   │   │   │       │   ├── field.tsx
│   │   │   │       │   ├── input.tsx
│   │   │   │       │   ├── label.tsx
│   │   │   │       │   └── select.tsx
│   │   │   │       ├── separator.tsx
│   │   │   │       └── table.tsx
│   │   │   ├── hooks
│   │   │   │   └── useActiveService.ts
│   │   │   ├── index.css
│   │   │   ├── lib
│   │   │   │   ├── api.ts
│   │   │   │   ├── socket.ts
│   │   │   │   └── utils.ts
│   │   │   ├── main.tsx
│   │   │   ├── pages
│   │   │   │   ├── 404
│   │   │   │   │   └── NotFoundPage.tsx
│   │   │   │   ├── admin
│   │   │   │   │   ├── AdminPage.tsx
│   │   │   │   │   └── forms
│   │   │   │   │       ├── CreateSection.tsx
│   │   │   │   │       └── CreateService.tsx
│   │   │   │   ├── counter
│   │   │   │   │   └── CounterPage.tsx
│   │   │   │   ├── history
│   │   │   │   │   ├── AdminHistory.tsx
│   │   │   │   │   └── CounterHistory.tsx
│   │   │   │   └── HomePage.tsx
│   │   │   ├── types
│   │   │   │   ├── attendanceTypes.ts
│   │   │   │   ├── deleteModalType.ts
│   │   │   │   ├── sectionTypes.ts
│   │   │   │   └── serviceTypes.ts
│   │   │   └── utils
│   │   │       ├── csvExport.ts
│   │   │       └── formatDate.ts
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   └── vite.config.ts
│   └── server
│       ├── .gitignore
│       ├── jest.config.ts
│       ├── nodemon.json
│       ├── package-lock.json
│       ├── package.json
│       ├── prisma
│       │   ├── migrations
│       │   │   ├── 20260522161612_init
│       │   │   │   └── migration.sql
│       │   │   ├── 20260522161953_add_relations
│       │   │   │   └── migration.sql
│       │   │   └── migration_lock.toml
│       │   └── schema.prisma
│       ├── server.ts
│       ├── src
│       │   ├── app.ts
│       │   ├── config
│       │   │   └── prisma.ts
│       │   ├── controllers
│       │   │   ├── churchAttendance.controller.ts
│       │   │   ├── churchSection.controller.ts
│       │   │   ├── churchService.controller.ts
│       │   │   └── csvExport.controller.ts
│       │   ├── middleware
│       │   │   ├── churchSection.middleware.ts
│       │   │   └── churchService.middleware.ts
│       │   ├── routes
│       │   │   ├── churchAttendance.routes.ts
│       │   │   ├── churchSection.routes.ts
│       │   │   ├── churchService.routes.ts
│       │   │   ├── csvExport.route.ts
│       │   │   └── serverIP.route.ts
│       │   ├── services
│       │   │   ├── churchAttendance.service.ts
│       │   │   ├── churchSection.service.ts
│       │   │   ├── churchService.service.ts
│       │   │   └── csvExport.service.ts
│       │   ├── sockets
│       │   │   └── socket.ts
│       │   ├── types
│       │   │   ├── churchAttendance.type.ts
│       │   │   ├── churchSection.type.ts
│       │   │   └── churchService.type.ts
│       │   └── __tests__
│       │       └── socketTest.html
│       ├── tsconfig.json
│       └── tsconfig.test.json
├── docs
│   ├── COMPONENTS.md
│   ├── CONVENTIONS.md
│   ├── dev-log.md
│   └── plan.md
├── electron
│   ├── main.ts
│   └── tsconfig.json
├── nodemon.json
├── package-lock.json
├── package.json
├── packages
│   └── shared
│       └── package.json
├── README.md
└── Tree.md
