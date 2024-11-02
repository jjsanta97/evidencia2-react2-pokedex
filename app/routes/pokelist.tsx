/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const offset = url.searchParams.get("offset") || 0;
    const pokemonlist = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
    return json(await pokemonlist.json());
};

export default function PokeList() {
    const list = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const offset = Number(searchParams.get("offset") || 0);

    const nextPage = () => {
        navigate(`/pokelist?offset=${offset + 20}`);
    };

    const previousPage = () => {
        if (offset > 0) {
            navigate(`/pokelist?offset=${offset - 20}`);
        }
    };

    return (
        <div className="container">
            <h1 className="mt-4 text-center">Pokédex</h1>
            <img
                className="mb-4"
                style={{ width: "100px", margin: "auto" }}
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
                alt="Pokebola"
            />
            <div className="row">
                {list.results.map((element: any) => (
                    <div className="col-3 mb-4" key={element.url}>
                        <div className="card">
                            <div className="card-body text-center">
                                <h5 className="card-title">{element.name[0].toUpperCase() + element.name.slice(1)}</h5>
                                <img
                                    src={
                                        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                                        element.url.match(/\/pokemon\/(\d+)\//)?.[1] +
                                        ".png"
                                    }
                                    alt={element.name}
                                    style={{ width: "100px", margin: "auto" }}
                                />
                                <Link to={`/pokemon/${element.name}`} className="btn btn-outline-primary">
                                    Detalles
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center">
                <button onClick={previousPage} disabled={offset === 0} className="btn btn-primary m-4" type="button">
                    Anterior
                </button>
                <button onClick={nextPage} className="btn btn-primary m-4" type="button">
                    Siguiente
                </button>
            </div>
        </div>
    );
}
