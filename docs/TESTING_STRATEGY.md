# Testing Strategy & Quality Assurance

## 1. Test Pyramid

1. **Unit Tests (Vitest)**:
   - Currency and duration formatters (`formatNaira`, `formatDuration`).
   - Zod validation schemas (Booking inquiry, Fan club, Checkout).
   - Audio mathematical utilities (frequency smoothing, volume clamping).
2. **Component Integration Tests (React Testing Library)**:
   - `PersistentPlayer`: Verifies play/pause state transitions, volume adjustment, and accessibility labels.
   - `FanClubForm`: Validates submission handling, email regex verification, loading indicators, and success toast rendering.
   - `BookingForm`: Checks required field validation and payload formatting.
3. **End-to-End & Build Verification**:
   - Next.js build compilation (`npm run build`).
   - TypeScript compiler validation (`tsc --noEmit`).
   - Static asset verification.
