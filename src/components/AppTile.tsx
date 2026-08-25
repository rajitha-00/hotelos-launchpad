import React from 'react';
import { motion } from 'framer-motion';
import { IAppItem } from '../interfaces';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PaymentsIcon from '@mui/icons-material/Payments';
import InventoryIcon from '@mui/icons-material/Inventory';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PublicIcon from '@mui/icons-material/Public';

interface AppTileProps {
  app: IAppItem;
  onSelect: (app: IAppItem) => void;
}

export const AppTile: React.FC<AppTileProps> = ({ app, onSelect }) => {
  const renderNavbarIcon = () => {
    switch (app.id) {
      case 'stay-os':
        return <HotelIcon sx={{ fontSize: 36, color: '#FFFFFF' }} />;
      case 'dine-os':
        return <RestaurantIcon sx={{ fontSize: 36, color: '#FFFFFF' }} />;
      case 'people-hr':
        return <PeopleIcon sx={{ fontSize: 36, color: '#FFFFFF' }} />;
      case 'super-admin':
        return <AdminPanelSettingsIcon sx={{ fontSize: 36, color: '#FFFFFF' }} />;
      case 'payments-os':
        return <PaymentsIcon sx={{ fontSize: 36, color: '#FFFFFF' }} />;
      case 'inventory-os':
        return <InventoryIcon sx={{ fontSize: 36, color: '#FFFFFF' }} />;
      case 'nami-ai':
        return <AutoAwesomeIcon sx={{ fontSize: 36, color: '#FFFFFF' }} />;
      case 'public-web':
        return <PublicIcon sx={{ fontSize: 36, color: '#FFFFFF' }} />;
      default:
        return <AutoAwesomeIcon sx={{ fontSize: 36, color: '#FFFFFF' }} />;
    }
  };

  return (
    <motion.button
      type="button"
      layoutId={`card-container-${app.id}`}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.94 }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 24,
      }}
      onClick={() => onSelect(app)}
      className="flex flex-col items-center text-center p-3 rounded-2xl cursor-pointer select-none outline-none group focus:ring-2 focus:ring-blue-400/40"
    >
      {/* SQUIRCLE APP ICON (iOS App Launcher Design) */}
      <motion.div
        layoutId={`card-image-container-${app.id}`}
        className="relative w-[72px] h-[72px] rounded-[22px] flex items-center justify-center text-white shrink-0 overflow-hidden shadow-lg border border-white/30 group-hover:shadow-xl transition-shadow"
        style={{
          background: app.iconBg || 'linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Gloss reflection overlay at top */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-[45%] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%)',
          }}
        />

        {/* Center Vector Icon from Navbar AppLauncher */}
        <div className="relative z-10 flex items-center justify-center">
          {renderNavbarIcon()}
        </div>
      </motion.div>

      {/* APP NAME */}
      <motion.span
        layoutId={`title-container-${app.id}`}
        className="font-bold text-slate-900 text-xs sm:text-[13px] mt-2 tracking-tight line-clamp-1 max-w-[96px] group-hover:text-blue-600 transition-colors"
      >
        {app.name}
      </motion.span>

      {/* BADGE (PILL STYLE) */}
      {app.badge && (
        <span
          className={`mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide shadow-2xs select-none ${
            app.badgeColor || 'bg-black text-white'
          }`}
        >
          {app.badge}
        </span>
      )}
    </motion.button>
  );
};
