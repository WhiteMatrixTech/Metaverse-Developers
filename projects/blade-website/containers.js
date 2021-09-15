import useApprove from 'hooks/useApprove';
import useCharacterCount from 'hooks/useCharacterCount';
import useTokenBalance from 'hooks/useTokenBalance';
import useWeaponCount from 'hooks/useWeaponCount';
import { createContainer } from 'unstated-next';
export const Approve = createContainer(useApprove);
export const TokenBalance = createContainer(useTokenBalance);
export const CharacterCount = createContainer(useCharacterCount);
export const WeaponCount = createContainer(useWeaponCount);
