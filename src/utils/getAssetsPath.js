export function getAssetPath(relativePath) {
    try {
        // import dynamique pour charger l'image depuis src/assets/
        const modules = import.meta.glob('../assets/**/*', { eager: true });
        const path = `../assets/${relativePath}`;
        return modules[path]?.default || relativePath;
        
    } catch (e) {
        console.error("Erreur de chargement de l'image :", relativePath, e);
        return relativePath; // Retourne le chemin d'origine en cas d'erreur
    }
}
