import React from 'react';
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  YoutubeLogoIcon,
  TiktokLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react';
import { useSiteConfigStore } from '../../store/useSiteConfigStore';
import { FormInput, Section } from '../common/index';
import { SiteConfig } from '../../types';

type SocialKey = keyof SiteConfig['social'];

const PLATFORMS: { key: SocialKey; label: string; placeholder: string; Icon: React.FC<{ size?: number; weight?: string }> }[] = [
  { key: 'instagram', label: 'Instagram',  placeholder: 'https://instagram.com/yourprofile', Icon: InstagramLogoIcon },
  { key: 'facebook',  label: 'Facebook',   placeholder: 'https://facebook.com/yourpage',    Icon: FacebookLogoIcon  },
  { key: 'tiktok',    label: 'TikTok',     placeholder: 'https://tiktok.com/@yourprofile',  Icon: TiktokLogoIcon    },
  { key: 'youtube',   label: 'YouTube',    placeholder: 'https://youtube.com/@yourchannel', Icon: YoutubeLogoIcon   },
  { key: 'linkedin',  label: 'LinkedIn',   placeholder: 'https://linkedin.com/company/you', Icon: LinkedinLogoIcon  },
  { key: 'twitter',   label: 'X (Twitter)', placeholder: 'https://x.com/yourprofile',       Icon: XLogoIcon         },
];

export const SocialSection: React.FC = () => {
  const { config, updateSocial } = useSiteConfigStore();
  const social = config.social ?? { facebook: '', instagram: '', linkedin: '', youtube: '', tiktok: '', twitter: '' };

  return (
    <div className="space-y-4">
      <Section
        title="Social media"
        description="Add links to show icons in the site footer. Leave blank to hide."
      >
        <div className="space-y-4">
          {PLATFORMS.map(({ key, label, placeholder, Icon }) => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <FormInput
                  label={label}
                  value={social[key]}
                  onChange={(value) => updateSocial({ [key]: value })}
                  type="url"
                  placeholder={placeholder}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
