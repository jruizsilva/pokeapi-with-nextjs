import { pokeApi } from '@/api'
import { PokemonData, PokemonResponse } from '@/interfaces'

export const getPokemonResponse = async (
  idOrName: string
): Promise<PokemonData | null> => {
  try {
    const { data } = await pokeApi.get<PokemonResponse>(
      `/pokemon/${idOrName.toLowerCase()}`
    )

    return {
      id: data.id,
      name: data.name,
      img:
        data.sprites.other?.dream_world.front_default ||
        data.sprites.front_default
    }
  } catch (error) {
    return null
  }
}
