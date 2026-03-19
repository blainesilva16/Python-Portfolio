import { useEffect, useRef } from 'react';

const useOutsideClick = (callback: any) => {
  const ref = useRef(null);

  useEffect(() => {
    interface ClickEvent extends MouseEvent, TouchEvent {}

    const handleClickOutside = (event: ClickEvent): void => {
        // Check if the clicked element is outside the referenced element
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
        }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // For mobile compatibility

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback]); // Re-run useEffect if the callback changes

  return ref;
};

export default useOutsideClick;
