<?php

namespace App\Http\Controllers\Platos;

use App\Http\Controllers\Controller;
use App\Http\Requests\Platos\PlatoCategoriaRequest;
use App\Http\Requests\Platos\PlatoRequest;
use App\Http\Resources\PlatoResource;
use App\Models\Plato;
use App\Models\Plato_categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlatosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PlatoResource::collection(Plato::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PlatoRequest $request)
    {
        $newPlato = $request->all();

        $newNameFile = str_replace('.', '', $request->nombre);
        $newNameFile = str_replace(' ', '_', $newNameFile);
        $newNameFile = strtolower($newNameFile).'.jpg';

        $urlBase = env('APP_URL').'/storage/';

        $newPlato['imagen'] = $urlBase.str_replace('public/', '', Storage::putFileAs('public/platos', $request->file('imagen'), $newNameFile));

        return (new PlatoResource(Plato::create($newPlato)))->additional([
            'message' => 'Plato Creado Correctamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Plato $plato)
    {
        return new PlatoResource($plato);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function relationCategoria(PlatoCategoriaRequest $request)
    {
        $plato = Plato::where('id', $request->idPlato)->first();
        $categoria = Plato::where('id', $request->idCategoria)->first();

        if (!$plato && !$categoria){
            return response()->json([
                'message' => 'Los datos proporcionados no son válidos.',
                'errors' => [
                    'idPlato' => 'Plato no encontrado',
                    'idCategoria' => 'Categoria no encontrado'
                ]
            ], 400);
        }else if (!$plato){
            return response()->json([
                'message' => 'Los datos proporcionados no son válidos.',
                'errors' => [
                    'idPlato' => 'Plato no encontrado'
                ]
            ], 400);
        } else if(!$categoria){
            return response()->json([
                'message' => 'Los datos proporcionados no son válidos.',
                'errors' => [
                    'idCategoria' => 'Categoria no encontrado'
                ]
            ], 400);
        }

        $relationPC = new Plato_categoria();
        $relationPC->idPlato = $plato->id;
        $relationPC->idCategoria = $plato->id;
        $relationPC->save();

        return response()->json([
            'message' => $relationPC
        ], 200);
    }
}
