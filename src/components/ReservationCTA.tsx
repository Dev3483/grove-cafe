"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReservationCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [date, setDate] = useState("Today, Oct 18");
  const [time, setTime] = useState("7:30 PM");
  const [guests, setGuests] = useState("2 Guests");
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      gsap.fromTo(
        ".cta-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
    }, 5000);
  };

  return (
    <section
      id="reserve"
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-12 md:px-20 lg:px-24 flex items-center justify-center overflow-hidden"
      style={{ minHeight: "85vh" }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/cafe_entering_poster.jpg"
        suppressHydrationWarning
        className="absolute inset-0 w-full h-full object-cover scale-105"
        style={{ willChange: "transform" }}
      >
        <source src="/videos/cafe_entering.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(15,13,11,0.95) 0%, rgba(15,13,11,0.7) 50%, rgba(15,13,11,0.92) 100%)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-2xl mx-auto text-center"
      >
        <div className="cta-reveal flex items-center justify-center gap-3 mb-3">
          <div style={{ width: 24, height: 1.5, background: "var(--color-amber)" }} />
          <span
            style={{
              color: "var(--color-amber-light)",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            Table Reservations
          </span>
          <div style={{ width: 24, height: 1.5, background: "var(--color-amber)" }} />
        </div>

        <h2
          className="cta-reveal"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
            color: "var(--color-cream)",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            marginBottom: "1rem",
          }}
        >
          Reserve Your Table
          <br />
          <span
            style={{
              color: "transparent",
              backgroundImage:
                "linear-gradient(135deg, #f5f0e8 0%, var(--color-amber-light) 60%, var(--color-gold) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            At The Pavilion
          </span>
        </h2>

        <p
          className="cta-reveal"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            color: "rgba(245,240,232,0.65)",
            marginBottom: "2.5rem",
            lineHeight: 1.75,
            maxWidth: "500px",
            marginInline: "auto",
          }}
        >
          Select your desired timing for breakfast, lunch, or evening dinner.
          Walk-ins are welcomed, but priority seating is guaranteed with reservations.
        </p>

        {/* Interactive Booking Widget */}
        <div
          className="cta-reveal p-6 sm:p-8 rounded-2xl"
          style={{
            background: "rgba(20,16,13,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(200,149,108,0.25)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
          }}
        >
          {booked ? (
            <div className="py-8 text-center animate-fade-in">
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-amber-500/20 text-amber-300 text-2xl">
                ✓
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-serif)", color: "var(--color-cream)" }}
              >
                Table Confirmed
              </h3>
              <p className="text-sm text-stone-300 mb-1">
                We have reserved a table for {guests} on {date} at {time}.
              </p>
              <p className="text-xs text-amber-400/80">
                A confirmation has been dispatched. We look forward to welcoming you!
              </p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  className="block text-left text-[10px] uppercase font-semibold tracking-wider mb-2 text-stone-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Date
                </label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-3 rounded-lg text-xs font-semibold text-stone-200 outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(200,149,108,0.3)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <option value="Today, Oct 18" className="bg-stone-900">Today, Oct 18</option>
                  <option value="Tomorrow, Oct 19" className="bg-stone-900">Tomorrow, Oct 19</option>
                  <option value="Friday, Oct 20" className="bg-stone-900">Friday, Oct 20</option>
                  <option value="Saturday, Oct 21" className="bg-stone-900">Saturday, Oct 21</option>
                  <option value="Sunday, Oct 22" className="bg-stone-900">Sunday, Oct 22</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-left text-[10px] uppercase font-semibold tracking-wider mb-2 text-stone-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-3 rounded-lg text-xs font-semibold text-stone-200 outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(200,149,108,0.3)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <option value="9:00 AM (Breakfast)" className="bg-stone-900">9:00 AM (Breakfast)</option>
                  <option value="12:30 PM (Lunch)" className="bg-stone-900">12:30 PM (Lunch)</option>
                  <option value="4:00 PM (High Coffee)" className="bg-stone-900">4:00 PM (High Coffee)</option>
                  <option value="7:30 PM (Dinner)" className="bg-stone-900">7:30 PM (Dinner)</option>
                  <option value="9:00 PM (Late Dinner)" className="bg-stone-900">9:00 PM (Late Dinner)</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-left text-[10px] uppercase font-semibold tracking-wider mb-2 text-stone-400"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Party Size
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3 py-3 rounded-lg text-xs font-semibold text-stone-200 outline-none"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(200,149,108,0.3)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <option value="1 Guest" className="bg-stone-900">1 Guest (Single Bar)</option>
                  <option value="2 Guests" className="bg-stone-900">2 Guests (Couple Table)</option>
                  <option value="4 Guests" className="bg-stone-900">4 Guests (Booth)</option>
                  <option value="6 Guests" className="bg-stone-900">6 Guests (Garden Table)</option>
                  <option value="8+ Guests" className="bg-stone-900">8+ Guests (Private Salon)</option>
                </select>
              </div>

              <div className="sm:col-span-3 mt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-amber), var(--color-amber-light))",
                    color: "#1a1210",
                    fontFamily: "var(--font-sans)",
                    boxShadow: "0 8px 30px rgba(200,149,108,0.35)",
                  }}
                >
                  Confirm Reservation →
                </button>
              </div>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-white/5 text-[11px] text-stone-400">
            <span>📞 Direct: +91 98765 43210</span>
            <span>✉️ concierge@grove.cafe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
