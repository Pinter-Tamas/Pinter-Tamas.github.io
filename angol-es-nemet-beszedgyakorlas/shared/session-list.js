// Shared session list renderer — landing page és booking oldal is használja

function loadUpcomingSessions(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  db.collection('sessions')
    .where('date', '>=', new Date().toISOString().split('T')[0])
    .where('status', '==', 'open')
    .get()
    .then(function(snapshot) {
      // Rendezzük kliens oldalon
      var docs = [];
      snapshot.forEach(function(doc) { docs.push({ id: doc.id, data: doc.data() }); });
      docs.sort(function(a, b) {
        if (a.data.date !== b.data.date) return a.data.date.localeCompare(b.data.date);
        return a.data.startTime.localeCompare(b.data.startTime);
      });
      if (docs.length === 0) {
        container.innerHTML = '<p class="loading">Jelenleg nincs elérhető időpont. Nézz vissza később!</p>';
        return;
      }
      var html = '';
      docs.forEach(function(doc) {
        var s = doc.data;
        var enrolled = s.enrolledStudents ? s.enrolledStudents.length : 0;
        var spotsLeft = s.maxParticipants - enrolled;
        var spotsText = spotsLeft > 0
          ? '<span class="session-spots">Szabad hely: ' + spotsLeft + ' / ' + s.maxParticipants + '</span>'
          : '<span class="session-spots session-full">Betelt</span>';

        var typeLabel = s.type === 'vegyes' ? 'Angol & Német' : (s.type === 'angol' ? 'Angol' : 'Német');

        html += '<div class="session-card">'
          + '<span class="session-type">' + escapeHtml(typeLabel) + '</span>'
          + '<div class="session-date">' + escapeHtml(formatDate(s.date)) + ' · ' + escapeHtml(s.startTime) + '–' + escapeHtml(s.endTime) + '</div>'
          + '<div class="session-location">📍 ' + escapeHtml(s.location) + ' — ' + escapeHtml(s.address) + '</div>'
          + spotsText
          + '</div>';
      });
      container.innerHTML = html;
    })
    .catch(function(err) {
      console.error('Sessions load error:', err);
      container.innerHTML = '<p class="loading">Az időpontok betöltése nem sikerült. Próbáld újra később.</p>';
    });
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  var d = new Date(dateStr);
  var months = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];
  var days = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
  return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate() + '.';
}

function escapeHtml(s) {
  if (!s) return '';
  var d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}