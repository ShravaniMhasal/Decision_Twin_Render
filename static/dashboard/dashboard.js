new Chart(document.getElementById('activityChart'), {
  type: 'line',
  data: {
    labels: ['Feb','Mar','Apr','May','Jun','Jul'],
    datasets: [{
      label: 'Comparisons',
      data: [12,18,22,19,27,30],
      borderColor: '#0A4174',
      backgroundColor: 'rgba(10,65,116,0.08)',
      fill: true,
      tension: 0.35,
      pointRadius: 3
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { color: '#49769F' }, grid: { color: '#e3edf5' } },
      x: { ticks: { color: '#49769F' }, grid: { display: false } }
    }
  }
});

new Chart(document.getElementById('fieldChart'), {
  type: 'doughnut',
  data: {
    labels: ['Data & Analytics','Design','Engineering','Product'],
    datasets: [{
      data: [35, 20, 30, 15],
      backgroundColor: ['#0A4174','#49769F','#4E8EA2','#7BBDE8'],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: '#001D39', boxWidth: 10, font: { size: 11 } } } }
  }
});

function sendMentor(){
  const input = document.getElementById('mentorInput');
  if(input.value.trim() !== ''){
    alert('Mentor received: "' + input.value + '"\n(connect this to your backend/AI API for real responses)');
    input.value = '';
  }
}


