import { useState } from "react";
import { motion } from "framer-motion";
import { X, Check, ArrowRight, HelpCircle } from "lucide-react";

import * as LucideIcons from "lucide-react";
import type { ServiceCategory } from "@/sanity/types/services";

interface ServiceModalProps {
    selectedCategory: ServiceCategory;
    onClose: () => void;
}

export const ServiceModal = ({ selectedCategory, onClose }: ServiceModalProps) => {
    const [showQuoteInfo, setShowQuoteInfo] = useState(false);

    const IconComponent = (LucideIcons as any)[selectedCategory.icon] || HelpCircle;

    const getPackageStyles = (tag: string) => {
        switch (tag) {
            case "Esencial":
                return {
                    wrapper: "border-white/10 bg-white/5 hover:boder-white/20",
                    badge: "bg-gray-800 text-gray-300",
                    button: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
                    priceColor: "text-white",
                    featureIcon: "text-gray-500"
                };
            case "Crecimiento":
                return {
                    wrapper: "border-primary/50 bg-primary/10 shadow-2xl shadow-primary/20 relative z10 transform md:-translate-y-4",
                    badge: "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/40",
                    button: "bg-gradient-primary text-primary-foreground hove:glow-primary shadow-lg shadow-primary/20",
                    priceColor: "text-primary",
                    featureIcon: "text-primary",
                };
            case "Pro":
                return {
                    wrapper: "border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50",
                    badge: "bg-purple-900/40 text-purple-200 border border-purple-500/20",
                    button: "bg-purple-600/20 text-purple-200 hover:bg-purple-600/40 border border-purple-500/30",
                    priceColor: "text-purple-300",
                    featureIcon: "text-purple-400",
                };
            default:
                return { wrapper: "", badge: "", button: "", priceColor: "", featureIcon: ""};
        }
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4">
            {/* Backdrop (Fondo oscuro borroso) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-background/80 backdrop-blur-xl"
            />

            {/* Tarjeta del Modal */}
            <motion.div
                layoutId={`card-container-${selectedCategory.id}`}
                className="relative w-full max-w-7xl max-h-[95vh] bg-card border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col z-10"
            >
                {/* Header */}
                <div className="relative shrink-0 p-8 md:p-10 border-b border-white/5 bg-card/95 backdrop-blur z-20 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex p-4 rounded-2xl bg-muted/20 border border-white/10 shadow-inner">
                    <IconComponent className={`w-8 h-8 ${selectedCategory.color}`} />
                    </div>
                    <div>
                    <motion.h3
                        layoutId={`title-${selectedCategory.id}`}
                        className="font-orbitron text-2xl md:text-4xl font-black text-foreground mb-2"
                    >
                        {selectedCategory.title}
                    </motion.h3>
                    <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
                        {selectedCategory.description}
                    </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors border border-white/5"
                >
                    <X className="w-6 h-6" />
                </button>
                </div>

                <div className="p-6 md:p-10 overflow-y-auto bg-grid-white/[0.02]">
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 pt-6 pb-4 items-start">
                    {/* Iteramos sobre los paquetes que vienen de Sanity */}
                    {selectedCategory.packages && selectedCategory.packages.map((pkg, idx) => {
                    const styles = getPackageStyles(pkg.tag);
                    return (
                        <div
                        key={idx}
                        className={`relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 group ${styles.wrapper}`}
                        >
                        {pkg.tag === "Crecimiento" && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-primary/30 z-20">
                            Más Popular
                            </div>
                        )}

                        <div className="mb-8 text-center">
                            <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg mb-4 ${styles.badge}`}>
                            {pkg.tag}
                            </span>
                            <h4 className="font-orbitron text-xl font-bold text-foreground mb-4">
                            {pkg.name}
                            </h4>
                            <div className={`text-2xl md:text-3xl font-black ${styles.priceColor}`}>
                            {pkg.price}
                            </div>
                            <span className="text-xs text-muted-foreground font-medium mt-1 block">
                            MXN + IVA (Estimado)
                            </span>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                        <ul className="space-y-4 mb-10 flex-grow px-2">
                            {pkg.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <div className={`mt-0.5 shrink-0 ${styles.featureIcon}`}>
                                <Check className="w-4 h-4" />
                                </div>
                                <span className="leading-snug">{feat}</span>
                            </li>
                            ))}
                        </ul>

                        <a
                            href={`/contacto?servicio=${encodeURIComponent(
                            selectedCategory.title
                            )}&paquete=${encodeURIComponent(pkg.name)}`}
                            className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all transform active:scale-95 text-center flex items-center justify-center gap-2 ${styles.button}`}
                        >
                            Cotizar Ahora
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        </div>
                    );
                    })}
                </div>
                </div>

                {/* Footer del Modal */}
                <div className="shrink-0 p-6 bg-card border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
                <div className="flex items-center gap-2 relative group">
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowQuoteInfo(!showQuoteInfo);
                    }}
                    className="text-muted-foreground hover:text-foreground text-xs md:text-sm underline decoration-dotted transition-colors"
                    >
                    ¿Cómo funcionan los pagos?
                    </button>

                    {showQuoteInfo && (
                    <div className="absolute bottom-full left-0 mb-4 w-72 p-5 bg-popover border border-border rounded-xl shadow-2xl z-50 text-left">
                        <h6 className="font-bold text-foreground text-xs mb-3 uppercase tracking-wider">
                        Modelo DiSa
                        </h6>
                        <ol className="list-decimal list-inside space-y-2 text-xs text-muted-foreground">
                        <li>Anticipo para Diagnóstico (Acreditable).</li>
                        <li>50% al firmar contrato.</li>
                        <li>Resto contra entregables.</li>
                        </ol>
                    </div>
                    )}
                </div>
                <p className="text-xs text-muted-foreground text-center sm:text-right">
                    * Precios sujetos a evaluación técnica final.
                </p>
                </div>
            </motion.div>
            </div>
        );

}