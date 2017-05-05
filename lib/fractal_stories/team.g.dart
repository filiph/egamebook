// GENERATED CODE - DO NOT MODIFY BY HAND

part of stranded.team;

// **************************************************************************
// Generator: BuiltValueGenerator
// Target: abstract class Team
// **************************************************************************

class _$Team extends Team {
  @override
  final int id;

  factory _$Team([void updates(TeamBuilder b)]) =>
      (new TeamBuilder()..update(updates)).build();

  _$Team._({this.id}) : super._() {
    if (id == null) throw new ArgumentError.notNull('id');
  }

  @override
  Team rebuild(void updates(TeamBuilder b)) =>
      (toBuilder()..update(updates)).build();

  @override
  TeamBuilder toBuilder() => new TeamBuilder()..replace(this);

  @override
  bool operator ==(dynamic other) {
    if (identical(other, this)) return true;
    if (other is! Team) return false;
    return id == other.id;
  }

  @override
  int get hashCode {
    return $jf($jc(0, id.hashCode));
  }

  @override
  String toString() {
    return 'Team {'
        'id=${id.toString()},\n'
        '}';
  }
}

class TeamBuilder implements Builder<Team, TeamBuilder> {
  _$Team _$v;

  int _id;
  int get id => _$this._id;
  set id(int id) => _$this._id = id;

  TeamBuilder();

  TeamBuilder get _$this {
    if (_$v != null) {
      _id = _$v.id;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(Team other) {
    if (other == null) throw new ArgumentError.notNull('other');
    _$v = other as _$Team;
  }

  @override
  void update(void updates(TeamBuilder b)) {
    if (updates != null) updates(this);
  }

  @override
  _$Team build() {
    final result = _$v ?? new _$Team._(id: id);
    replace(result);
    return result;
  }
}
