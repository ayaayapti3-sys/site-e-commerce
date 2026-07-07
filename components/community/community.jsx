import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import styles from "./community.module.css";

/* Instagram icon personnalisé */
function InstagramIcon({
  size = 18,
  strokeWidth = 1.5,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />

      <circle
        cx="17.5"
        cy="6.5"
        r="0.8"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

const communityPosts = [
  {
    id: 1,
    image: "/images/community/community-1.png",
    username: "@salma.style",
    likes: 428,
    product: "Sac Nour",
    href: "#",
    position: "top",
  },
  {
    id: 2,
    image: "/images/community/community-2.png",
    username: "@ines.daily",
    likes: 615,
    product: "Sandales Lina",
    href: "#",
    position: "bottom",
  },
  {
    id: 3,
    image: "/images/community/community-3.png",
    username: "@maha.edit",
    likes: 892,
    product: "Sac Amira",
    href: "#",
    position: "center",
    featured: true,
  },
  {
    id: 4,
    image: "/images/community/communityy-4.png",
    username: "@lina.mood",
    likes: 356,
    product: "Bottines Selma",
    href: "#",
    position: "bottom",
  },
  {
    id: 5,
    image: "/images/community/communityy-.png",
    username: "@nour.looks",
    likes: 503,
    product: "Sac en cuir cognac",
    href: "#",
    position: "top",
  },
];

export default function Community() {
  return (
    <section className={styles.community} data-aos="fade-up">
      <div className={styles.container}>
        <header className={styles.header} data-aos="fade-up">
          <div className={styles.headingContent}>
            <span className={styles.eyebrow}>
              Notre communauté
            </span>

            <h2 className={styles.title}>
              Portées par vous,
              <br />
              <em>partagées avec nous.</em>
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.intro}>
              Découvrez Maison Élyra à travers celles qui portent nos créations
              au quotidien.
            </p>

            <Link
              href="#"
              className={styles.instagramLink}
              aria-label="Voir Maison Élyra sur Instagram"
            >
              <InstagramIcon size={18} strokeWidth={1.5} />

              <span>@maisonelyra</span>

              <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </header>

        <div className={styles.gallery}>
          {communityPosts.map((post) => (
            <article
              key={post.id}
              className={[
                styles.post,
                styles[post.position],
                post.featured ? styles.featured : "",
              ].join(" ")}
              data-aos="fade-up"
            >
              <Link
                href={post.href}
                className={styles.postLink}
                aria-label={`Voir la publication de ${post.username}`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={post.image}
                    alt={`${post.username} portant ${post.product}`}
                    fill
                    sizes="(max-width: 720px) 78vw, 20vw"
                    className={styles.image}
                  />

                  <div className={styles.overlay} />

                  <div className={styles.topMeta}>
                    <span className={styles.instagramIcon}>
                      <InstagramIcon size={17} strokeWidth={1.5} />
                    </span>

                    <span className={styles.likes}>
                      <Heart size={15} strokeWidth={1.5} />
                      {post.likes}
                    </span>
                  </div>

                  <div className={styles.postContent}>
                    <span className={styles.username}>
                      {post.username}
                    </span>

                    <span className={styles.product}>
                      {post.product}
                    </span>

                    <span className={styles.postAction}>
                      Voir sur Instagram
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.footer} data-aos="fade-up">
          <div className={styles.footerText}>
            <span className={styles.footerNumber}>
              01
            </span>

            <p>
              Identifiez <strong>@maisonelyra</strong> dans vos photos pour
              rejoindre notre galerie.
            </p>
          </div>

          <Link href="#" className={styles.cta}>
            <span>Rejoindre la communauté</span>
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <span className={styles.watermark} aria-hidden="true">
        ÉLYRA
      </span>
    </section>
  );
}