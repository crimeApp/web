export const MockData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export const MockDataCrimeType = {
    labels: ["Robo con arma blanca", "Robo sin armas", "Robo con arma de fuego", "Daño a la propiedad privada", "Hurto"],
    datasets: [
        {
            label: 'Tipo de siniestro',
            data: [242, 21, 1563, 15, 3021],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimeAge = {
    labels: ["Menor de edad", "18-25", "25-35", "35-45", "Más de 50", "No recuerdo"],
    datasets: [
        {
            label: 'Edad de los sospechosos',
            data: [18, 80, 42, 13, 2, 2],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimeSex = {
    labels: ["Hombre", "Mujer", "Otro"],
    datasets: [
        {
            label: 'Sexo de los sospechosos',
            data: [152, 20, 5],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimeHair = {
    labels: ["Oscuro", "Rubio", "Castaño", "Teñido fantasía (color no convencional)"],
    datasets: [
        {
            label: "Color de pelo",
            data: [80, 27, 15, 4],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimeHeight = {
    labels: ["Alto", "Mediano", "Bajo", "No recuerdo"],
    datasets: [
        {
            label: "Altura de los sospechosos",
            data: [20, 80, 12, 15],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimeSkin = {
    labels: ["no lo sé/no contesta", "piel muy clara", "piel clara", "piel morena clara", "piel morena oscura", "piel oscura", "piel muy oscura"],
    datasets: [
        {
            label: "Color de piel de los sospechosos",
            data: [124, 15, 17, 27, 57, 58, 16],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimePlace = {
    labels: ["Parque", "Calle", "Parada de colectivo", "Centro comercial", "Propiedad privada", "Parque", "Supermercado", "Estacionamiento", "Otro"],
    datasets: [
        {
            label: "Lugar del hecho",
            data: [20, 80, 35, 2, 28, 14, 4, 6, 5],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimeTime = {
    labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
    datasets: [
        {
            label: "Horarios del hecho",
            data: [222, 243, 200, 142, 121, 50, 20, 4, 2, 54, 83, 50 , 40, 28, 25, 20, 29, 80, 95, 120, 140, 150, 160, 170],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};


export const MockDataCrimeTemp = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
    datasets: [
        {
            label: 'Evolucion de los casos',
            data: [2450, 2332, 1563, 1200, 3021, 1923, 956, 955, 700],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimeTempRobo = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
    datasets: [
        {
            label: 'Robo a mano armada',
            data: [66, 44, 86, 90, 95, 45, 56, 66, 54],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimeAccompaniment = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
        {
            label: 'Criminales acompañados',
            data: [52, 64, 24, 14, 4, 2, 0, 0, 1],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockDataCrimeTempHurto = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
    datasets: [
        {
            label: 'Hurtos',
            data: [100, 24, 26, 110, 19, 65, 76, 46, 54],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockVictimPhysical = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
        {
            label: 'Daño fisico de la victima',
            data: [20,50,60,40,30],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockVictimEmotional = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
        {
            label: 'Daño emocional de la victima',
            data: [20,50,60,40,30],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const MockVictimAgresive = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
        {
            label: 'Nivel de agresividad del agresor',
            data: [20,50,60,40,30],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        },
    ],
};

export const DataHeatMap = [
    [-31.416668, -64.183334, 2],
    [-31.382232224204365, -64.18447639101693, 2],
    [-31.39179943758722, -64.178337407489, 2],
    [-31.372232224204365, -64.18447639101693, 2],
    [-31.362232224204365, -64.18447639101693, 2],
    [-31.352232224204365, -64.18447639101693, 2],
    [-31.342232224204365, -64.18447639101693, 2],
    [-31.416668, -64.183334, 2],
    [-31.382232224204365, -64.18447639101693, 2],
    [-31.39179943758722, -64.178337407489, 2],
    [-31.372232224204365, -64.18447639101693, 2],
    [-31.362232224204365, -64.18447639101693, 2],
    [-31.352232224204365, -64.18447639101693, 2],
    [-31.342232224204365, -64.18447639101693, 2],
    [-31.416668, -64.183334, 2],
    [-31.32232224204365, -64.1447639101693, 2],
    [-31.3179943758722, -64.18337407489, 2],
    [-31.3832224204365, -64.10447639101693, 2],
    [-31.382232224204365, -64.11447639101693, 2],
    [-31.372232224204365, -64.16447639101693, 2],
    [-31.362232224204365, -64.12447639101693, 2],
    [-31.416868, -64.183334, 2],
    [-31.382332224204365, -64.18447639101693, 2],
    [-31.39189943758722, -64.178337407489, 2],
    [-31.372332224204365, -64.18447639101693, 2],
    [-31.362332224204365, -64.18447639101693, 2],
    [-31.352332224204365, -64.18447639101693, 2],
    [-31.342332224204365, -64.18447639101693, 2],
    [-31.416568, -64.183334, 2],
    [-31.382332224204365, -64.18447639101693, 2],
    [-31.39189943758722, -64.178337407489, 2],
    [-31.372332224204365, -64.18447639101693, 2],
    [-31.362332224204365, -64.18447639101693, 2],
    [-31.352332224204365, -64.18447639101693, 2],
    [-31.342332224204365, -64.18447639101693, 2],
    [-31.416568, -64.183334, 2],
    [-31.32242224204365, -64.1447639101693, 2],
    [-31.3178943758722, -64.18337407489, 2],
    [-31.3833224204365, -64.10447639101693, 2],
    [-31.382332224204365, -64.11447639101693, 2],
    [-31.372332224204365, -64.16447639101693, 2],
    [-31.362332224204365, -64.12447639101693, 2],
]

export const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};