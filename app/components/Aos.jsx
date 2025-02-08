"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function Aos() {
  return useEffect(() => {
    AOS.init({});
  });
}
