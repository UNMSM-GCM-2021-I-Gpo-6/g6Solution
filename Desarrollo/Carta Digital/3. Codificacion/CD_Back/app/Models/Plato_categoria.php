<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plato_categoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'idPlato',
        'idCategoria'
    ];

    /** Campos que no se enviaran en la respuesta de la API */
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
