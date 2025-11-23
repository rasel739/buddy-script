'use client';
import Icons from '@/lib/icons';
import { FC, useState, useEffect } from 'react';

const ThemeSwitcher: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;

      if (newMode) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }

      return newMode;
    });
  };

  return (
    <div className='_layout_mode_swithing_btn'>
      <button
        type='button'
        className={`_layout_swithing_btn_link ${isDarkMode ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDarkMode}
      >
        <div className='_layout_swithing_btn'>
          <div className='_layout_swithing_btn_round'></div>
        </div>
        <div className='_layout_change_btn_ic1'>
          <Icons.Moon />
        </div>
        <div className='_layout_change_btn_ic2'>
          <Icons.Sun />
        </div>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
