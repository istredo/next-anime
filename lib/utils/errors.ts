import { addProductToCartFx, deleteCartItemFx, getCartItemsFx } from "@/api/cart"
import { JWTError } from "@/const/jwt"
import { refreshTokenFx } from "@/ctx/auth"
import { addProductsFromLSToCart } from "@/ctx/cart"
import { loginCheckFx } from "@/ctx/user"
import { IAddProductFromLSFx, IAddProductToCartFx } from "@/types/cart"
import { IBaseEffectProps } from "@/types/common"

export const handleJWTError = async (
	errorName: string,
	repeatRequestAfterRefreshData?: {
		repeatRequestMethodName: string
		payload?: unknown
	}
) => {
	if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
		const auth = JSON.parse(localStorage.getItem('auth') as string)
		const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })
		if (repeatRequestAfterRefreshData) {
			const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData

			switch (repeatRequestMethodName) {
				case 'getCartItemsFx':
					return getCartItemsFx({
						jwt: newTokens.accessToken,
					})
				case 'addProductsFromLSToCartFx':
					return addProductsFromLSToCart({
						...(payload as IAddProductFromLSFx),
						jwt: newTokens.accessToken,
					})
				case 'addProductToCartFx':
					return addProductToCartFx({
						...(payload as IAddProductToCartFx),
						jwt: newTokens.accessToken,
					})
				case 'deleteCartItemFx':
					return deleteCartItemFx({
						...(payload as IBaseEffectProps),
						jwt: newTokens.accessToken,
					})
				case 'loginCheckFx':
					await loginCheckFx({
						jwt: newTokens.accessToken,
					})
					break
			}
		}
	}
}