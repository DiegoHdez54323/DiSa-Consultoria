// src/components/blog/BlogPostPage.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, User, ArrowLeft, Calendar, ChevronRight } from "lucide-react";
import type { BlogPost } from "../../sanity/types/blog";
import {
  formatBlogDate,
  formatBlogReadTime,
  getPostMainCategory,
  getPostImageUrl,
} from "../../utils/blog/post-helpers";
import { urlForImage } from "../../sanity/lib/url-for-image";
import PortableText from "../PortableText.astro";

interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, relatedPosts }) => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const mainCategory = getPostMainCategory(post);
  const mainImageUrl = getPostImageUrl(post);

  const authorAvatarSource = post.author.avatar?.source;
  const authorAvatarUrl = authorAvatarSource
    ? urlForImage(authorAvatarSource).width(200).height(200).fit("crop").url()
    : undefined;

  // En teoría no deberías llegar aquí porque Astro sólo genera rutas con post
  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-sora text-4xl font-bold text-foreground mb-4">
              Artículo no encontrado
            </h1>
            <a href="/blog" className="text-primary hover:underline">
              Volver al blog
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-40 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[70vh] min-h-[500px] overflow-hidden"
      >
        {/* Parallax Image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, scale: imageScale }}
        >
          {mainImageUrl && (
            <img
              src={mainImageUrl}
              alt={post.mainImage?.alt || post.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative h-full flex items-end"
        >
          <div className="container mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              {/* Back Button */}
              <motion.a
                href="/blog"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="group inline-flex items-center gap-2 text-foreground/70 hover:text-primary mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-inter text-sm">Volver al blog</span>
              </motion.a>

              {/* Category Badge */}
              {mainCategory && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-inter font-medium mb-4 backdrop-blur-sm border border-primary/30"
                >
                  {mainCategory.title}
                </motion.span>
              )}

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-sora text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
              >
                {post.title}
              </motion.h1>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-6"
              >
                {/* Author */}
                <div className="flex items-center gap-3">
                  {authorAvatarUrl && (
                    <div className="relative">
                      <img
                        src={authorAvatarUrl}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
                      />
                      <div className="absolute inset-0 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-background" />
                    </div>
                  )}
                  <div>
                    <p className="font-inter font-medium text-foreground">
                      {post.author.name}
                    </p>
                    {post.author.role && (
                      <p className="font-inter text-sm text-muted-foreground">
                        {post.author.role}
                      </p>
                    )}
                  </div>
                </div>

                <div className="h-8 w-px bg-border/50" />

                {/* Date */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="font-inter text-sm">
                    {formatBlogDate(post.publishedAt)}
                  </span>
                </div>

                {/* Read Time */}
                {post.readTime && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-inter text-sm">
                      {formatBlogReadTime(post.readTime)} lectura
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="py-16 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left sidebar (acciones) eliminado */}

            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-8"
            >
              <div
                className="
                  prose prose-lg max-w-none
                  prose-headings:font-sora prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:font-inter prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:my-6 prose-ul:list-none prose-ul:pl-0
                  prose-li:font-inter prose-li:text-muted-foreground prose-li:mb-3 prose-li:pl-6 prose-li:relative
                  prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-3 prose-li:before:w-2 prose-li:before:h-2 prose-li:before:bg-primary prose-li:before:rounded-full
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:my-8
                  prose-blockquote:font-sora prose-blockquote:text-xl prose-blockquote:text-foreground prose-blockquote:italic prose-blockquote:not-italic
                  [&_.lead]:text-xl [&_.lead]:md:text-2xl [&_.lead]:text-foreground [&_.lead]:font-inter [&_.lead]:leading-relaxed [&_.lead]:mb-8
                "
              >
                {/* Aquí usamos tu componente PortableText para el cuerpo */}
                <PortableText portableText={post.body} />
              </div>

              {/* Tags section eliminada */}

              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-8 rounded-2xl bg-linear-to-br from-muted/50 to-muted/20 border border-border/50"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {authorAvatarUrl && (
                    <div className="relative shrink-0">
                      <img
                        src={authorAvatarUrl}
                        alt={post.author.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-primary/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-xs">
                          ✓
                        </span>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="font-inter text-sm text-muted-foreground mb-1">
                      Escrito por
                    </p>
                    <h4 className="font-sora text-xl font-bold text-foreground mb-1">
                      {post.author.name}
                    </h4>
                    {post.author.role && (
                      <p className="font-inter text-sm text-primary mb-3">
                        {post.author.role}
                      </p>
                    )}
                    <p className="font-inter text-muted-foreground">
                      Apasionado por la tecnología y la innovación. Comparto
                      conocimientos sobre desarrollo, arquitectura de software y
                      las últimas tendencias del sector.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.article>

            {/* Right Sidebar - Table of Contents (por ahora estático) */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="lg:col-span-3 hidden lg:block"
            >
              <div className="sticky top-24">
                <h4 className="font-sora text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  En este artículo
                </h4>
                <nav className="space-y-3">
                  {[
                    "El Cambio de Paradigma",
                    "Herramientas que Están Liderando",
                    "Impacto en la Productividad",
                    "Desafíos y Consideraciones",
                    "El Futuro",
                    "Conclusión",
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block font-inter text-sm text-muted-foreground hover:text-primary transition-colors pl-4 border-l-2 border-border/50 hover:border-primary"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-muted/30" />
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="relative container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Artículos{" "}
                  <span className="text-gradient-primary">relacionados</span>
                </h2>
                {mainCategory && (
                  <p className="font-inter text-muted-foreground">
                    Continúa explorando sobre {mainCategory.title}
                  </p>
                )}
              </div>
              <a
                href="/blog"
                className="hidden md:flex items-center gap-2 text-primary font-inter font-medium hover:gap-3 transition-all"
              >
                Ver todos
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => {
                const relatedMainCategory = getPostMainCategory(relatedPost);
                const relatedImageUrl = getPostImageUrl(relatedPost);

                return (
                  <motion.article
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <a href={`/blog/${relatedPost.slug}`}>
                      <div className="relative h-full rounded-2xl overflow-hidden border border-border/50 bg-card transition-all duration-500 hover:border-primary/30 hover:glow-primary">
                        <div className="relative h-48 overflow-hidden">
                          {relatedImageUrl && (
                            <img
                              src={relatedImageUrl}
                              alt={
                                relatedPost.mainImage?.alt || relatedPost.title
                              }
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          )}
                          <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
                        </div>
                        <div className="p-6">
                          {relatedMainCategory && (
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-inter font-medium mb-3">
                              {relatedMainCategory.title}
                            </span>
                          )}
                          <h3 className="font-sora text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <User className="w-3 h-3" />
                              <span>{relatedPost.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {relatedPost.readTime && (
                                <span>
                                  {formatBlogReadTime(relatedPost.readTime)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />

        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Te gustó este artículo?
            </h2>
            <p className="font-inter text-lg text-muted-foreground mb-8">
              Suscríbete a nuestro newsletter para recibir contenido exclusivo
              sobre tecnología e innovación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-6 py-3 rounded-full bg-muted/50 border border-border/50 text-foreground font-inter placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-inter font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                Suscribirse
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default BlogPostPage;
