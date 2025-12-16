// Base de datos de equivalencias (valores correctos verificados)
const ingredients = {
    harina: {
        name: 'Harina de trigo',
        conversions: {
            gramos: 1,
            tazas: 125,
            cucharadas: 15,
            cucharaditas: 3
        }
    },
    azucar: {
        name: 'Azúcar blanca',
        conversions: {
            gramos: 1,
            tazas: 200,
            cucharadas: 20,
            cucharaditas: 4
        }
    },
    azucarImpalpable: {
        name: 'Azúcar Impalpable',
        conversions: {
            gramos: 1,
            tazas: 120,
            cucharadas: 15,
            cucharaditas: 3
        }
    },
    mantequilla: {
        name: 'Mantequilla',
        conversions: {
            gramos: 1,
            tazas: 225,
            cucharadas: 15,
            cucharaditas: 3
        }
    },
    leche: {
        name: 'Leche',
        conversions: {
            gramos: 1,
            tazas: 240,
            mililitros: 1,
            cucharadas: 15,
            cucharaditas: 5
        }
    },
    aceite: {
        name: 'Aceite',
        conversions: {
            gramos: 1,
            tazas: 190,
            mililitros: 1.08,
            cucharadas: 15,
            cucharaditas: 5
        }
    },
    cacao: {
        name: 'Cacao en polvo',
        conversions: {
            gramos: 1,
            tazas: 140,
            cucharadas: 15,
            cucharaditas: 3
        }
    },
    miel: {
        name: 'Miel',
        conversions: {
            gramos: 1,
            tazas: 340,
            mililitros: 1.42,
            cucharadas: 20,
            cucharaditas: 10
        }
    },
    agua: {
        name: 'Agua',
        conversions: {
            gramos: 1,
            tazas: 240,
            mililitros: 1,
            cucharadas: 15,
            cucharaditas: 5
        }
    },
    avena: {
        name: 'Avena en copos',
        conversions: {
            gramos: 1,
            tazas: 90,
            cucharadas: 10,
            cucharaditas: 3
        }
    }
};

const unitLabels = {
    gramos: 'g',
    tazas: 'tazas',
    cucharadas: 'cdas',
    cucharaditas: 'cditas',
    mililitros: 'ml'
};

// Función para calcular conversiones
function calculateConversions(ingredient, amount, fromUnit) {
    console.log('Calculando:', ingredient, amount, fromUnit); // Debug
    
    if (!amount || isNaN(amount) || amount <= 0) {
        console.log('Cantidad inválida'); // Debug
        return null;
    }

    const ingredientData = ingredients[ingredient];
    if (!ingredientData) {
        console.log('Ingrediente no encontrado'); // Debug
        return null;
    }
    
    const fromValue = ingredientData.conversions[fromUnit];
    if (!fromValue) {
        console.log('Unidad no válida para este ingrediente'); // Debug
        return null;
    }
    
    // Convertir todo a gramos primero
    const amountInGrams = fromUnit === 'gramos' ? parseFloat(amount) : parseFloat(amount) * fromValue;
    console.log('Cantidad en gramos:', amountInGrams); // Debug

    // Calcular todas las conversiones
    const results = {};
    Object.keys(ingredientData.conversions).forEach(unit => {
        if (unit !== fromUnit) {
            results[unit] = unit === 'gramos' 
                ? amountInGrams 
                : amountInGrams / ingredientData.conversions[unit];
        }
    });

    console.log('Resultados:', results); // Debug
    return results;
}

// Función para mostrar resultados
function displayResults() {
    console.log('displayResults llamada'); // Debug
    
    const ingredientSelect = document.getElementById('ingredientSelect');
    const amountInput = document.getElementById('amountInput');
    const unitSelect = document.getElementById('unitSelect');
    
    if (!ingredientSelect || !amountInput || !unitSelect) {
        console.error('Elementos no encontrados en el DOM');
        return;
    }
    
    const ingredient = ingredientSelect.value;
    const amount = amountInput.value;
    const unit = unitSelect.value;
    
    console.log('Valores obtenidos:', ingredient, amount, unit); // Debug
    
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsGrid = document.getElementById('resultsGrid');
    
    if (!resultsContainer || !resultsGrid) {
        console.error('Contenedores de resultados no encontrados');
        return;
    }

    const results = calculateConversions(ingredient, amount, unit);
    
    if (results && Object.keys(results).length > 0) {
        console.log('Mostrando resultados'); // Debug
        resultsGrid.innerHTML = '';
        
        Object.entries(results).forEach(([unit, value]) => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            resultCard.innerHTML = `
                <div class="result-unit">${unitLabels[unit]}</div>
                <div class="result-value">${value.toFixed(2)}</div>
            `;
            resultsGrid.appendChild(resultCard);
        });
        
        resultsContainer.style.display = 'block';
    } else {
        console.log('Ocultando resultados'); // Debug
        resultsContainer.style.display = 'none';
    }
}

// Función para actualizar las unidades disponibles según el ingrediente
function updateAvailableUnits() {
    console.log('updateAvailableUnits llamada'); // Debug
    
    const ingredientSelect = document.getElementById('ingredientSelect');
    const unitSelect = document.getElementById('unitSelect');
    
    if (!ingredientSelect || !unitSelect) {
        console.error('Selects no encontrados');
        return;
    }
    
    const ingredient = ingredientSelect.value;
    const currentUnit = unitSelect.value;
    
    const ingredientData = ingredients[ingredient];
    const availableUnits = Object.keys(ingredientData.conversions);
    
    console.log('Unidades disponibles:', availableUnits); // Debug
    
    // Limpiar opciones
    unitSelect.innerHTML = '';
    
    // Agregar solo las unidades disponibles para este ingrediente
    availableUnits.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unitLabels[unit];
        unitSelect.appendChild(option);
    });
    
    // Intentar mantener la unidad seleccionada si existe
    if (availableUnits.includes(currentUnit)) {
        unitSelect.value = currentUnit;
    }
    
    // Recalcular si hay un valor
    const amountInput = document.getElementById('amountInput');
    if (amountInput && amountInput.value) {
        displayResults();
    }
}

// Función para llenar la tabla de referencia
function fillReferenceTable() {
    console.log('fillReferenceTable llamada'); // Debug
    
    const tbody = document.getElementById('referenceTableBody');
    if (!tbody) {
        console.error('Tbody de la tabla no encontrado');
        return;
    }
    
    tbody.innerHTML = '';
    
    Object.entries(ingredients).forEach(([key, ing]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="ingredient-name">${ing.name}</td>
            <td>${ing.conversions.tazas ? ing.conversions.tazas + 'g' : '-'}</td>
            <td>${ing.conversions.cucharadas ? ing.conversions.cucharadas + 'g' : '-'}</td>
            <td>${ing.conversions.cucharaditas ? ing.conversions.cucharaditas + 'g' : '-'}</td>
        `;
        tbody.appendChild(row);
    });
    
    console.log('Tabla llenada correctamente'); // Debug
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando...'); // Debug
    
    // Verificar que existan los elementos
    const ingredientSelect = document.getElementById('ingredientSelect');
    const amountInput = document.getElementById('amountInput');
    const unitSelect = document.getElementById('unitSelect');
    
    if (!ingredientSelect || !amountInput || !unitSelect) {
        console.error('Error: Elementos del formulario no encontrados en el DOM');
        console.log('ingredientSelect:', ingredientSelect);
        console.log('amountInput:', amountInput);
        console.log('unitSelect:', unitSelect);
        return;
    }
    
    console.log('Elementos encontrados correctamente'); // Debug
    
    // Llenar tabla de referencia
    fillReferenceTable();
    
    // Actualizar unidades disponibles al inicio
    updateAvailableUnits();
    
    // Listeners para el conversor
    ingredientSelect.addEventListener('change', function() {
        console.log('Ingrediente cambiado'); // Debug
        updateAvailableUnits();
    });
    
    amountInput.addEventListener('input', function() {
        console.log('Cantidad cambiada'); // Debug
        displayResults();
    });
    
    unitSelect.addEventListener('change', function() {
        console.log('Unidad cambiada'); // Debug
        displayResults();
    });
    
    console.log('Event listeners agregados correctamente'); // Debug
});



/* ========================================= */
            /* BOTON PARA SUBIR */
/* ========================================= */

const btnSubir = document.getElementById('btnSubir');

// Mostrar/ocultar el botón según el scroll
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) { // Aparece después de 100px
        btnSubir.classList.add('mostrar');
    } else {
        btnSubir.classList.remove('mostrar');
    }
});

// Al hacer clic, subir suavemente
btnSubir.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});