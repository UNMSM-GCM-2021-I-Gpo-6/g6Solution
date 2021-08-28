<?php

namespace App\Http\Controllers\Categorias;

use App\Http\Controllers\Controller;
use App\Http\Requests\Categoria\CategoriaRequest;
use App\Http\Resources\CategoriaResource;
use App\Models\Categoria;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CategoriaResource::collection(Categoria::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoriaRequest $request)
    {
        $newCategoria = $request->all();

        $newNameFile = str_replace('.', '', $request->nombre);
        $newNameFile = str_replace(' ', '_', $newNameFile);
        $newNameFile = strtolower($newNameFile).'.jpg';

        $urlBase = env('APP_URL').'/storage/';

        $newCategoria['imagen'] = $urlBase.str_replace('public/', '', Storage::putFileAs('public/categorias', $request->file('imagen'), $newNameFile));


        return (new CategoriaResource(Categoria::create($newCategoria)))->additional([
            'message' => 'Caategoria Guardada Correctamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Categoria $categoria)
    {
        return new CategoriaResource($categoria);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoriaRequest $request, Categoria $categoria)
    {
        $newCategoria = $request->all();

        $newNameFile = str_replace('.', '', $request->nombre);
        $newNameFile = str_replace(' ', '_', $newNameFile);
        $newNameFile = strtolower($newNameFile).'.jpg';

        $urlBase = env('APP_URL').'/storage/';

        $newCategoria['imagen'] = $urlBase.str_replace('public/', '', Storage::putFileAs('public/categorias', $request->file('imagen'), $newNameFile));


        return (new CategoriaResource($categoria->update($newCategoria)))->additional([
            'message' => 'Caategoria Actualizada Correctamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Categoria $categoria)
    {
        // Obtencion del nombre del archivo
        $nameFile = explode('/', $categoria->imagen);
        $tamArray = count($nameFile);
        $nameFile = $nameFile[$tamArray-1];

        // Eliminar el colegio de la BD
        $categoria->delete();

        // Elimnar el archivo del storage
        Storage::delete('public/categorias/'.$nameFile);

        return response()->json([
            'message' => 'Categoria Eliminada Correctamente'
        ]);
    }
}
