import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function useLink() {
    const router = useRouter();
    const isScrolling = useRef<boolean>(false)

    return {
        linkTo: function(dir: `#${string}`, scroll?: boolean) {
            const hash = window.location.hash;


            if (scroll != null) {
                isScrolling.current = scroll;
            }

            if (dir != hash && isScrolling.current) {
                router.replace(dir, { scroll: true })
                isScrolling.current = false
                return false;
            }

            return;
        }
    };
}
