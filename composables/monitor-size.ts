import { onMounted, onUnmounted, reactive, toRefs } from "vue";
// import { useRoute } from 'vue-router'; 

export function useMonitorSize() {
    const sizes = reactive({
        browserWidth: 700,
        deviceWidth: 700,
        isMobile: false
    });

	// const route = useRoute();

    const isMobile = () => {
        return window.innerWidth <= 600 ? true : false
    };

    const browserResized = () => {
        if (typeof window !== 'undefined') {
            sizes.browserWidth = window.innerWidth;
            sizes.deviceWidth = screen.width;
            sizes.isMobile = isMobile();
        }
    };

    onMounted(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', browserResized);
            browserResized();
        }
    });

    onUnmounted(() => {
        if (typeof window !== 'undefined') { // Verifica se window está definido
            window.removeEventListener('resize', browserResized);
        }
    })

    return {
        ...toRefs(sizes),
    }
}