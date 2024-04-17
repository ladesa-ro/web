import { onMounted, onUnmounted, reactive, toRefs } from "vue";
import { throttle } from 'lodash';

export function useMonitorSize() {
    const sizes = reactive({
        browserWidth: 700,
        deviceWidth: 700,
        isMobile: false,
    });

	const isMobile = () => window.matchMedia('(max-width: 600px)').matches;

    const browserResized = throttle(() => {
        if (typeof window !== 'undefined') {
            sizes.browserWidth = window.innerWidth;
            sizes.deviceWidth = screen.width;
            sizes.isMobile = isMobile();
        }
    },50);

    onMounted(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', browserResized);
            browserResized();
        }
    });

    onUnmounted(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', browserResized);
        }
    })

    return {
        ...toRefs(sizes),
    }
}