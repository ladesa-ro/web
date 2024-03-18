import { onMounted, onUnmounted, reactive, toRefs } from "vue";

export function useMonitorSize() {
    const sizes = reactive({
        browserWidth: 700, // Inicializa com 0 ou outro valor padrão
        deviceWidth: 700, // Inicializa com 0 ou outro valor padrão
        isMobile: false
    })

    const isMobile = () => {
        return window.innerWidth <= 600 ? true : false
    }

    const browserResized = () => {
        if (typeof window !== 'undefined') { // Verifica se window está definido
            sizes.browserWidth = window.innerWidth;
            sizes.deviceWidth = screen.width;
            sizes.isMobile = isMobile();
        }
    }

    onMounted(() => {
        if (typeof window !== 'undefined') { // Verifica se window está definido
            window.addEventListener('resize', browserResized);
            browserResized(); // Chama a função para inicializar os valores
        }
    })

    onUnmounted(() => {
        if (typeof window !== 'undefined') { // Verifica se window está definido
            window.removeEventListener('resize', browserResized);
        }
    })

    return {
        ...toRefs(sizes),
    }
}