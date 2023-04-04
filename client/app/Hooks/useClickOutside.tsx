import { useEffect, RefObject } from "react";

type Event = MouseEvent | TouchEvent;

function useClickOutside(
  ref: RefObject<HTMLElement>,
  active: boolean,
  setActive: (x: boolean) => void
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        setActive(false);
      }
    }
    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, active, setActive]);
}

export default useClickOutside;
