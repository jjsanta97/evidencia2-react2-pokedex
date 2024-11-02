/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const name = params.name;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
        throw new Response("No se encontró el Pokémon", { status: 404 });
    }
    return json(await response.json());
};

export default function PokemonDetail() {
    const pokemon = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className="mb-4 mt-4 text-center">{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
            <div className="card text-center" style={{ width: "400px", height: "auto", margin: "auto" }}>
                <img
                    className="p-4"
                    style={{ width: "400px", height: "400px" }}
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt={pokemon.name}
                />
                <div className="card-body">
                    <div className="row">
                        <div className="col-6 text-right">
                            <b>Altura:</b>
                        </div>
                        {/* La altura está en decimetros por eso se divide entre 10 para convertir a metros */}
                        <div className="col-6 text-left">{pokemon.height / 10} m</div>{" "}
                    </div>
                    <div className="row">
                        <div className="col-6 text-right">
                            <b>Peso:</b>
                        </div>
                        {/* El peso está en hectogramos por eso se divide entre 10 para convertir a kilogramos */}
                        <div className="col-6 text-left">{pokemon.weight / 10} kg</div>{" "}
                    </div>
                    <div className="row">
                        <div className="col-6 text-right">
                            <b>Tipo:</b>
                        </div>
                        <div className="col-6 text-left">
                            <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
                                {pokemon.types.map((element: any) => (
                                    <li style={{ display: "inline", marginRight: "5px" }} key={element.id}>
                                        {element.type.name[0].toUpperCase() + element.type.name.slice(1)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className="mt-2">
                        <b>Estadísticas:</b>
                    </p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col-3">Vida</th>
                                <th className="col-3">Ataque</th>
                                <th className="col-3">Defensa</th>
                                <th className="col-3">Velocidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{pokemon.stats[0].base_stat}</td>
                                <td>{pokemon.stats[1].base_stat}</td>
                                <td>{pokemon.stats[2].base_stat}</td>
                                <td>{pokemon.stats[5].base_stat}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={() => navigate(-1)} className="btn btn-outline-primary m-4" type="button">
                        Regresar
                    </button>
                </div>
            </div>
        </div>
    );
}
