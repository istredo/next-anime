import type { Metadata } from "next";
import { PagesLayout } from "@/components/layouts/PagesLayout";

import './globalStyles/normalize.css'
import "./globalStyles/globals.scss";
import "./globalStyles/header.css";
import "./globalStyles/menu.css";
import "./globalStyles/mobile-navbar.css";
import "./globalStyles/catalog-menu.css";
import "./globalStyles/search-modal.css";
import "./globalStyles/cart-popup.css";
import "./globalStyles/footer.css";
import "./globalStyles/slick.css";
import "./globalStyles/slick-theme.css";
import "./globalStyles/auth.css";
import "./globalStyles/header-profile.css";
import "./globalStyles/cookie-popup.css";

export const metadata: Metadata = {
	title: "Next.JS project",
	description: "My first Next.JS project",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <PagesLayout>{children}</PagesLayout>;
}
