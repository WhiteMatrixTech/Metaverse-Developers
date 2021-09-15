/* eslint-disable @next/next/no-img-element */
import Layout from 'components/Layout';
import WeaponBuyPannel from 'components/nft/WeaponBuyPannel';
import CharacterBuyPannel from 'components/nft/CharacterBuyPannel';
import NftPanel from 'components/nft/NftPanel';
import { Approve, CharacterCount, WeaponCount } from 'containers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import styles from './nft.module.scss';

const MAIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
const USDT_TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDT_TOKEN_CONTRACT;

export default function Nft() {
  const router = useRouter();
  useEffect(() => {
    let anchor = document.getElementById(router.query.key);
    if (anchor) {
      window.scrollTo(0, anchor.offsetTop - 60);
    }
  }, [router.query.key]);
  return (
    <Layout>
      <Approve.Provider
        initialState={{ tokenAddress: USDT_TOKEN_CONTRACT_ADDRESS, spenderAddress: MAIN_CONTRACT_ADDRESS }}
      >
        <div className={styles.root}>
          <NftPanel
            mainImg="/image/gallery/cha01.png"
            title="Blaze Dazzle"
            desc="Blaze Dazzle, who was once a descendant of knights, founded the Knights Templar. 
            From the very beginning of its establishment, 
            the Knights Templar has taken saving the dead and healing the wounded as its mission, 
            and has been fighting against the forefront of the dark, 
            demonstrating the value of justice without hesitation, 
            and therefore won everyone's support. As the leader of the Knights of the Temple, he is called Blaze Dazzle."
            id="hero_001"
            attrs={{ level: 1, power: 100 }}
          >
            <CharacterCount.Provider initialState={{ kind: 1 }}>
              <CharacterBuyPannel
                price="29"
                totalAmount={300}
                buyBtnText="Buy Now"
                buyCategory="character"
                kind={1}
                oldTotal={0}
              />
            </CharacterCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/cha02.png"
            title="Bleed Phantom"
            desc="After being famous, his dream was to become a bard. 
            For this reason, Feige traveled all over the mountains and rivers of the mainland. 
            However, there are unpredictable circumstances. The father who devoted himself to studying 
            theology was murdered by the Duke of Lombard. He has been quietly waiting for 
            the day of revenge for ten years after he was determined to avenge his father. Bleed Phantom"
            id="hero_002"
            attrs={{ level: 2, power: 200 }}
          >
            <CharacterCount.Provider initialState={{ kind: 2 }}>
              <CharacterBuyPannel
                price="149"
                totalAmount={135}
                buyBtnText="Buy Now"
                buyCategory="character"
                kind={2}
                oldTotal={0}
              />
            </CharacterCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/cha030.png"
            title="Blade Lord"
            desc="Born in the declining royal family of the Edsab Empire,
           Prince Yvli with noble blood. As the only heir to the empire, 
           he has been shouldering the mission of rejuvenating the empire since he was a child, 
           and his strong confidence in himself has given him a character that ignores everything. 
           Because he can control the power of the sacred flame, he is called the Blade Lord."
            id="hero_003"
            attrs={{ level: 3, power: 900 }}
          >
            <CharacterCount.Provider initialState={{ kind: 3 }}>
              <CharacterBuyPannel
                price="1499"
                totalAmount={45}
                buyBtnText="Buy Now"
                buyCategory="character"
                kind={3}
                oldTotal={0}
              />
            </CharacterCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/w11.png"
            title="Axe of Cut rock"
            desc="Heavy weapons, swinging to split mountains and open ridges, cutting iron like mud"
            id="weapon_001"
            attrs={{ level: 1, power: 100 }}
          >
            <WeaponCount.Provider initialState={{ kind: 1, level: 1 }}>
              <WeaponBuyPannel
                price="29"
                totalAmount={200}
                buyBtnText="Buy Now"
                buyCategory="weapon"
                kind={1}
                level={1}
                oldTotal={0}
              />
            </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/w12.png"
            title="Axe of Soul Suppression"
            desc="The whole body is made of black iron, and the cold glow shines like a mountain and a ridge"
            id="weapon_002"
            attrs={{ level: 2, power: 200 }}
          >
            <WeaponCount.Provider initialState={{ kind: 1, level: 2 }}>
              <WeaponBuyPannel
                price="149"
                totalAmount={90}
                buyBtnText="Buy Now"
                buyCategory="weapon"
                kind={1}
                level={2}
                oldTotal={0}
              />
            </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/w13.png"
            title="Holy Axe"
            desc="The golden body emits oppressive coercion and contains endless divine power"
            id="weapon_003"
            attrs={{ level: 3, power: 400 }}
          >
            <WeaponCount.Provider initialState={{ kind: 1, level: 3 }}>
              <WeaponBuyPannel
                price="699"
                totalAmount={30}
                buyBtnText="Buy Now"
                buyCategory="weapon"
                kind={1}
                level={3}
                oldTotal={0}
              />
            </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/w21.png"
            title="Bloodthirsty Greatsword"
            desc="Just like a harvester on the battlefield, it will make people become excited and bloodthirsty."
            id="weapon_004"
            attrs={{ level: 1, power: 100 }}
          >
            <WeaponCount.Provider initialState={{ kind: 2, level: 1 }}>
              <WeaponBuyPannel
                price="29"
                totalAmount={200}
                buyBtnText="Buy Now"
                buyCategory="weapon"
                kind={2}
                level={1}
                oldTotal={0}
              />
            </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/w22.png"
            title="Demon Great Sword"
            desc="A huge sword with magical nature, wherever the blade reaches, not even a trace of soul is left"
            id="weapon_005"
            attrs={{ level: 2, power: 200 }}
          >
            <WeaponCount.Provider initialState={{ kind: 2, level: 2 }}>
              <WeaponBuyPannel
                price="149"
                totalAmount={90}
                buyBtnText="Buy Now"
                buyCategory="weapon"
                kind={2}
                level={2}
                oldTotal={0}
              />
            </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/w23.png"
            title="Great Sword of Gods"
            desc="Hidden hurricane-like power, from the blade naturally reveals who is fighting with the domineering"
            id="weapon_006"
            attrs={{ level: 3, power: 400 }}
          >
            <WeaponCount.Provider initialState={{ kind: 2, level: 3 }}>
              <WeaponBuyPannel
                price="699"
                totalAmount={30}
                buyBtnText="Buy Now"
                buyCategory="weapon"
                kind={2}
                level={3}
                oldTotal={0}
              />
            </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/w31.png"
            title="Sage Sword"
            desc="A superb sword made of meteorite with its blade, it shines like a star at night"
            id="weapon_007"
            attrs={{ level: 1, power: 100 }}
          >
            <WeaponCount.Provider initialState={{ kind: 3, level: 1 }}>
              <WeaponBuyPannel
                price="29"
                totalAmount={200}
                buyBtnText="Buy Now"
                buyCategory="weapon"
                kind={3}
                level={1}
                oldTotal={0}
              />
            </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/w32.png"
            title="Saint Mark Sword"
            desc="Sacred rune attached to the sword body, a holy pattern sword that is not afraid of any evil aura"
            id="weapon_008"
            attrs={{ level: 2, power: 200 }}
          >
            <WeaponCount.Provider initialState={{ kind: 3, level: 2 }}>
              <WeaponBuyPannel
                price="149"
                totalAmount={90}
                buyBtnText="Buy Now"
                buyCategory="weapon"
                kind={3}
                level={2}
                oldTotal={0}
              />
            </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
            mainImg="/image/gallery/w33.png"
            title="Demon Sword"
            desc="Underworld, blooming to welcome the coming of death, casting for killing"
            id="weapon_009"
            attrs={{ level: 3, power: 400 }}
          >
            <WeaponCount.Provider initialState={{ kind: 3, level: 3 }}>
              <WeaponBuyPannel
                price="699"
                totalAmount={30}
                buyBtnText="Buy Now"
                buyCategory="weapon"
                kind={3}
                level={3}
                oldTotal={0}
              />
            </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
          mainImg="/image/gallery/w41.png"
          title="Dragon Slaying Axe"
          desc="It seems clumsy, but in fact it is overbearing and unstoppable, sweeping the army"
          id="weapon_010"
          attrs={{ level: 1, power: 100 }}
          >
          <WeaponCount.Provider initialState={{ kind: 4, level: 1 }}>
          <WeaponBuyPannel
          price="29"
          totalAmount={200}
          buyBtnText="Buy Now"
          buyCategory="weapon"
          kind={4}
          level={1}
          oldTotal={0}
          />
          </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
          mainImg="/image/gallery/w42.png"
          title="Overlord Axe"
          desc="After the axe is released, it is like a tiger opening the gate, pulling the mountain out of breath, killing the enemy in a flash"
          id="weapon_011"
          attrs={{ level: 2, power: 200 }}
          >
          <WeaponCount.Provider initialState={{ kind: 4, level: 2 }}>
          <WeaponBuyPannel
          price="149"
          totalAmount={90}
          buyBtnText="Buy Now"
          buyCategory="weapon"
          kind={4}
          level={2}
          oldTotal={0}
          />
          </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
          mainImg="/image/gallery/w43.png"
          title="Axe of Vengeance"
          desc="The blazing fire of revenge, only death can set off its horror"
          id="weapon_012"
          attrs={{ level: 3, power: 400 }}
          >
          <WeaponCount.Provider initialState={{ kind: 4, level: 3 }}>
          <WeaponBuyPannel
          price="699"
          totalAmount={30}
          buyBtnText="Buy Now"
          buyCategory="weapon"
          kind={4}
          level={3}
          oldTotal={0}
          />
          </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
          mainImg="/image/gallery/w51.png"
          title="Warhammer of Killing"
          desc="Made for killing, made of bronze, heavy weapons, all invincible"
          id="weapon_013"
          attrs={{ level: 1, power: 100 }}
          >
          <WeaponCount.Provider initialState={{ kind: 5, level: 1 }}>
          <WeaponBuyPannel
          price="29"
          totalAmount={200}
          buyBtnText="Buy Now"
          buyCategory="weapon"
          kind={5}
          level={1}
          oldTotal={0}
          />
          </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
          mainImg="/image/gallery/w52.png"
          title="Warhammer of Fury"
          desc="The upgraded version of the ordinary warhammer, the strong output can cause multiple damage to the enemy"
          id="weapon_014"
          attrs={{ level: 2, power: 200 }}
          >
          <WeaponCount.Provider initialState={{ kind: 5, level: 2 }}>
          <WeaponBuyPannel
          price="149"
          totalAmount={90}
          buyBtnText="Buy Now"
          buyCategory="weapon"
          kind={5}
          level={2}
          oldTotal={0}
          />
          </WeaponCount.Provider>
          </NftPanel>
          <NftPanel
          mainImg="/image/gallery/w53.png"
          title="Grim Reaper"
          desc="A warhammer made by absorbing the essence of flames, it will burst out a terrifying fire of death during battle"
          id="weapon_015"
          attrs={{ level: 3, power: 400 }}
          >
          <WeaponCount.Provider initialState={{ kind: 5, level: 3 }}>
          <WeaponBuyPannel
          price="699"
          totalAmount={30}
          buyBtnText="Buy Now"
          buyCategory="weapon"
          kind={5}
          level={3}
          oldTotal={0}
          />
          </WeaponCount.Provider>
          </NftPanel>
        </div>
      </Approve.Provider>
    </Layout>
  );
}
