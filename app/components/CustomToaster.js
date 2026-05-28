"use client";

import { Toaster } from "react-hot-toast";
import { IoCheckmark, IoClose, IoInformation } from "react-icons/io5";

const iconMap = {
  success: IoCheckmark,
  error: IoClose,
  loading: IoInformation,
  blank: IoInformation,
};

export default function CustomToaster() {
  return (
    <Toaster position="top-center" gutter={10}>
      {(toast) => {
        const Icon = iconMap[toast.type] || IoInformation;

        return (
          <div
            className={`
              flex
              items-center
              gap-3
              rounded-lg
              border
              px-4
              py-3
              text-sm
              shadow-sm
              backdrop-blur-md
              transition
              ${toast.visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}
              ${
                toast.type === "error"
                  ? "border-red-400/25 bg-[#120706]/95 text-red-50"
                  : "border-emerald-400/20 bg-[#07100b]/95 text-emerald-50"
              }
            `}
          >
            <span
              className={`
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-md
                ${
                  toast.type === "error"
                    ? "bg-red-400/10 text-red-300"
                    : "bg-emerald-400/10 text-emerald-300"
                }
              `}
            >
              <Icon size={16} />
            </span>

            <span className="max-w-[280px] leading-snug">
              {toast.message}
            </span>
          </div>
        );
      }}
    </Toaster>
  );
}
